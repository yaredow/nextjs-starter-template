import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";

import { user } from "@/db/schema";
import { db } from "@/db";

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature") as string;

  if (!stripeWebhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 500 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const data = event.data;
  const eventType = event.type;

  switch (eventType) {
    case "checkout.session.completed":
      // Payment success
      try {
        // Extract relevant data
        const session = event.data.object;
        const customerId = session.customer as string;
        const customer = await stripe.customers.retrieve(customerId as string);
        const stripeCustomerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        const priceId = session?.line_items?.data[0]?.price?.id;
        const metadata = event?.data?.object?.metadata;

        if (priceId !== process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID) {
          return new Response("Invalid price ID", { status: 400 });
        }

        if (metadata) {
          const userId = metadata.userId;

          await db
            .update(user)
            .set({
              stripeSubscriptionId: subscriptionId,
              stripeSubscriptionStatus: subscription.status,
              stripePriceId: planId,
            })
            .where(eq(user.stripeCustomerId, stripeCustomerId));
        }

        // Update user's subscription status in your database

        console.log(
          `Checkout session completed for customer: ${stripeCustomerId}`,
        );
      } catch (error) {
        console.error("Error completing checkout session:", error);
        return new NextResponse("Error completing checkout session", {
          status: 500,
        });
      }
      break;

    case "customer.subscription.updated":
      // Subscription updated, e.g., plan changed
      try {
        // Extract relevant data from the event
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer as string;
        const subscriptionStatus = subscription.status;
        const plan = subscription.plan;
        const planId = plan.id;

        // Update user's subscription status in your database
        await db
          .update(user)
          .set({
            stripeSubscriptionStatus: subscriptionStatus,
            stripePriceId: planId,
          })
          .where(eq(user.stripeCustomerId, stripeCustomerId));

        console.log(`Subscription updated for customer: ${stripeCustomerId}`);
      } catch (error) {
        console.error("Error updating subscription:", error);
        return new NextResponse("Error updating subscription", { status: 500 });
      }
      break;

    case "customer.subscription.deleted":
      // Subscription canceled
      try {
        // Extract relevant data
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer as string;

        // Update user's subscription status in your database
        await db
          .update(user)
          .set({
            stripeSubscriptionStatus: "canceled",
            stripePriceId: null,
          })
          .where(eq(user.stripeCustomerId, stripeCustomerId));

        console.log(`Subscription canceled for customer: ${stripeCustomerId}`);
      } catch (error) {
        console.error("Error canceling subscription:", error);
        return new NextResponse("Error canceling subscription", {
          status: 500,
        });
      }
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
