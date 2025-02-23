import { userRouter } from "@/modules/users/server/procedures";
import { createTRPCRouter } from "../init";
import { stripeRouter } from "@/modules/stripe/server/procedures";

export const appRouter = createTRPCRouter({
  users: userRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
