"use client";

import { Button } from "@/components/ui/button";
import { stripePromise } from "@/lib/stripe";

export const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
    });

    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      <h1>Stripe checkout example</h1>
      <Button variant="secondary" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};
