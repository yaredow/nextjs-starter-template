import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx }) => {
      const { userId: id } = ctx;
      if (!id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const [userData] = await db.select().from(user).where(eq(user.id, id));

      return userData;
    }),
});
