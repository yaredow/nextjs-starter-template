import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { betterAuth } from "better-auth";

import { account, session, user, verification } from "@/db/schema";
import { db } from "@/db";

import { hashPassword, verifyPassword } from "./utils";

// You may want to create this service for sending emails
import { sendEmail } from "@/services/email";

export const auth = betterAuth({
  appName: "Next start",

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
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ otp, user }, request) {
          await sendEmail({
            to: user.email,
            subject: "Your Two-Factor Authentication Code",
            text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
            html: `
              <div>
                <h1>Two-Factor Authentication</h1>
                <p>Your verification code is: <strong>${otp}</strong></p>
                <p>This code will expire in 10 minutes.</p>
              </div>
            `,
          });
        },
      },
    }),
  ],
});
