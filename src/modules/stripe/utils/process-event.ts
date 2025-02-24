import Stripe from "stripe";
import { syncStripeDataToDatabase } from "./sync-stripe-data";

// Define the allowed events
export const allowedEvents = [
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

export const processEvent = async (event: Stripe.Event) => {
  // Skip processing if the event isn't one I'm tracking (list of all events below)
  if (!allowedEvents.includes(event.type)) {
    console.log(`Skipping event ${event.type}`);
    return;
  }

  // All the events I track have a customerId
  const { customer: customerId } = event?.data?.object as {
    customer: string;
  };

  // This helps make it typesafe and also lets me know if my assumption is wrong
  if (typeof customerId !== "string") {
    throw new Error(
      `[STRIPE HOOK][CANCER] ID isn't string.\nEvent type: ${event.type}`,
    );
  }

  try {
    await syncStripeDataToDatabase(customerId);
  } catch (error) {
    console.error(
      `Error syncing Stripe data for customer ${customerId}:`,
      error,
    );
    throw error; // Re-throw the error to be caught in the webhook endpoint
  }
};
