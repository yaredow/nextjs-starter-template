import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { handleStripeEvent } from "@/modules/stripe/utils/process-event";
import { tryCatch } from "@/lib/try-catch";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("Stripe-Signature");

  const { data: event, error } = await tryCatch(
    Promise.resolve(
      stripe.webhooks.constructEvent(
        body,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!,
      ),
    ),
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  try {
    await handleStripeEvent(event);
    return NextResponse.json(
      { message: "Webhook received and processed" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Webhook processing failed", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
