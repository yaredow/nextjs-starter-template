import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { subscriptionDataSchema } from "../schemas";

export async function syncStripeDataToDatabase(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: "all",
      expand: ["data.default_payment_method"],
    });

    if (subscriptions.data.length === 0) {
      const subData = {
        subscriptionId: null,
        status: "none",
        priceId: null,
        currentPeriodEnd: null,
        currentPeriodStart: null,
        cancelAtPeriodEnd: null,
        paymentMethodBrand: null,
        paymentMethodLast4: null,
      };

      await db
        .update(user)
        .set({
          stripeSubscriptionId: null,
          stripeSubscriptionStatus: "none",
          stripePriceId: null,
        })
        .where(eq(user.stripeCustomerId, customerId));

      return subscriptionDataSchema.parse(subData);
    }

    const subscription = subscriptions.data[0];

    let paymentMethodBrand: string | null = null;
    let paymentMethodLast4: string | null = null;

    if (
      subscription.default_payment_method &&
      typeof subscription.default_payment_method !== "string"
    ) {
      paymentMethodBrand =
        subscription.default_payment_method.card?.brand ?? null;
      paymentMethodLast4 =
        subscription.default_payment_method.card?.last4 ?? null;
    }

    const subData = {
      subscriptionId: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      currentPeriodEnd: subscription.current_period_end,
      currentPeriodStart: subscription.current_period_start,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      paymentMethodBrand,
      paymentMethodLast4,
    };

    await db
      .update(user)
      .set({
        stripeSubscriptionId: subscription.id,
        stripeSubscriptionStatus: subscription.status,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ), // Convert to Date
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        paymentMethodBrand,
        paymentMethodLast4,
      })
      .where(eq(user.stripeCustomerId, customerId));

    return subscriptionDataSchema.parse(subData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
