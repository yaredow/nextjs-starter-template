"use client";

import { Button } from "@/components/ui/button";
import { stripePromise } from "@/lib/stripe";

const products = [
  { id: 1, name: "Product 1", price: 10, image: "product1.jpg", quantity: 2 },
  { id: 2, name: "Product 2", price: 20, image: "product2.jpg", quantity: 1 },
];

export const CheckoutButton = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: products,
        returnUrl: window.location.origin,
      }),
    });

    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div>
      <h1>Checkout</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
      <Button variant="outline" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};
