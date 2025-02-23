import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { stripe } from "@/lib/stripe";

export const stripeRouter = createTRPCRouter({
  subscribe: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, id } = ctx.user;
      const { priceId } = input;
      console.log({ priceId });

      const existingCustomer = await stripe.customers.list({
        email,
        limit: 1,
      });

      let customerId =
        existingCustomer.data.length > 0 ? existingCustomer.data[0].id : null;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email,
          metadata: {
            userId: id,
          },
        });

        customerId = customer.id;
      }

      const { url } = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        billing_address_collection: "required",
        customer_update: {
          name: "auto",
          address: "auto",
        },
        success_url: `${process.env.NEXT_PUBLIC_URL}/payments/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/payments/cancel`,
      });

      return url;
    }),
});
