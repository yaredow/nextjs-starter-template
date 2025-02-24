import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { subscriptionDataSchema } from "../schemas";

export const stripeRouter = createTRPCRouter({
  syncStripeData: protectedProcedure
    .input(
      z.object({
        customerId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { customerId } = input;

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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to sync Stripe data",
        });
      }
    }),
  subscribe: protectedProcedure
    .input(
      z.object({
        priceId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, id } = ctx.user;
      const { priceId } = input;

      const userData = await db.select().from(user).where(eq(user.id, id));
      let stripeCustomerId = userData[0].stripeCustomerId;

      if (!stripeCustomerId) {
        try {
          const customer = await stripe.customers.create({
            email,
            metadata: {
              userId: id,
            },
          });

          stripeCustomerId = customer.id;

          await db
            .update(user)
            .set({ stripeCustomerId })
            .where(eq(user.id, id));
        } catch (error) {
          console.error(error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }

      const { url } = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
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
