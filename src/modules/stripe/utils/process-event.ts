import Stripe from "stripe";

import { syncStripeDataToDatabase } from "./sync-stripe-data";
import { allowedEvents } from "../constants";

const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const { customer: customerId } = event?.data?.object as { customer: string };

  if (typeof customerId !== "string") {
    throw new Error(
      `[STRIPE HOOK][CANCER] ID isn't string.\nEvent type: ${event.type}`,
    );
  }

  await syncStripeDataToDatabase(customerId);
};

export const processEvent = async (event: Stripe.Event) => {
  if (!allowedEvents.includes(event.type)) {
    console.log(`Skipping event ${event.type}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event);
      break;
    default:
      console.log(`No handler for event ${event.type}`);
  }
};
