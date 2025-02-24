import { processEvent } from "@/modules/stripe/utils/process-event";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") as string;

  if (!signature) {
    return new NextResponse("Missing stripe signature", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    await processEvent(event);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("[STRIPE WEBHOOK ERROR]", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 }); // Return error
  }
}
