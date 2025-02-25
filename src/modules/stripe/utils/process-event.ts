import { Stripe } from "stripe";

import { tryCatch } from "@/lib/try-catch";
import { stripe } from "@/lib/stripe";

import { syncStripeDataToDatabase } from "./sync-stripe-data";

async function getCustomerId(session: any): Promise<string | null> {
  if (typeof session?.customer === "string") {
    return session.customer;
  }

  // Handle other cases where customer is an object or doesn't exist
  console.warn("No customer ID found in session", session);
  return null;
}

async function processCheckoutSessionCompleted(event: any) {
  const { data: session, error } = await tryCatch(
    stripe.checkout.sessions.retrieve(event.data.object.id, {
      expand: ["line_items"],
    }),
  );

  if (error) {
    throw new Error(`Error retrieving session: ${error.message}`);
  }

  const customerId = await getCustomerId(session);
  if (!customerId) {
    throw new Error("No customer ID found");
  }

  const priceId = session?.line_items?.data[0]?.price?.id;

  if (priceId !== process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID) {
    throw new Error("Price ID doesn't match");
  }

  await syncStripeDataToDatabase(customerId);
}

export async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  const eventType = event.type;

  switch (eventType) {
    case "checkout.session.completed":
      await processCheckoutSessionCompleted(event);
      break;
    default:
      console.log(`Unhandled event type ${eventType}`);
  }
}
