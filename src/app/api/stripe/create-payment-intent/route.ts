import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const { cartItems, returnUrl } = await request.json();

    if (!cartItems || !returnUrl) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: cartItems.name,
              images: [cartItems.image],
            },
            unit_amount: cartItems.price * 100,
          },
          quantity: cartItems.quantity,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: returnUrl,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
