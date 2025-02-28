import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { betterAuth } from "better-auth";

import { account, session, user, verification } from "@/db/schema";
import { db } from "@/db";

import { hashPassword, verifyPassword } from "./utils";
import { resend } from "./resend";
import TwoFactorEmail from "@/emails/2fa-verification-email";

// You may want to create this service for sending emails

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
          await resend.emails.send({
            from: "yaredyilma11@gmail.com",
            to: user.email,
            subject: "Your OTP",
            react: TwoFactorEmail({
              verificationCode: otp,
              companyName: "Next start",
              userName: user.name,
              supportEmail: "yaredyilma11@gmail.com",
            }),
          });
        },
      },
    }),
  ],
});
