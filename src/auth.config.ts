import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { SigninFormSchema } from "@/lib/schema";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    Credentials({
      authorize: async (credentials) => {
        try {
          let user = null;

          const parsedData = SigninFormSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          });

          if (parsedData.success) {
            const { email, password } = parsedData.data;

            user = await prisma.user.findUnique({
              where: { email },
              select: { id: true, password: true, name: true, role: true },
            });

            if (!user || !user.password) return null;

            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password,
            );

            if (isPasswordCorrect) return user;
          }

          return null;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
