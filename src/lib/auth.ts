import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import { account, session, user, verification } from "@/db/schema";
import { db } from "@/db";

import { hashPassword, verifyPassword } from "./utils";

export const auth = betterAuth({
  user: {
    additionalFields: {
      stripeCustomerId: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
});
