"use server";

import { Resend } from "resend";
import ContactUsEmail from "@/emails/ContactUsEmail";
import WelcomeEmail from "@/emails/welcomeEmail";
import AccountVerificationEmail from "@/emails/AccountVerificationEmail";
import PasswordResetEmail from "@/emails/PasswordResetEmail";
import AdminNotificationEmail from "@/emails/AdminNotificationEmail";
import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";
import { OrderItemsType } from "../../../../types/order";
import NewsletterEmail from "@/emails/NewsLetterSubscribingEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Your 2fa code:",
    html: `Here is your 2fa code: <p>${token}"></p>`,
  });
};

export const sendPasswordResetToken = async (
  email: string,
  token: string,
  name: string,
) => {
  const firstName = name.split(" ")[0];
  const resetUrl = `https://konjo-habesha-fashion.vercel.app/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: PasswordResetEmail({ firstName, resetUrl }),
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verificationUrl = `https://konjo-habesha-fashion.vercel.app/auth/new-verification?token=${token}`;
  const firstName = name.split(" ")[0];

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: AccountVerificationEmail({ firstName, verificationUrl }),
  });
};

export const sendContactUsEmail = async (
  name: string,
  senderEmail: string,
  message: string,
) => {
  const firstName = name.split(" ")[0];

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: senderEmail,
    subject: "Thank you for your feedback",
    reply_to: process.env.HOST_EMAIL_ADDRESS as string,
    react: ContactUsEmail({
      firstName,
      message,
      replyToEmail: process.env.HOST_EMAIL_ADDRESS as string,
    }),
  });
};

export const sendAdminNotificationEmail = async (
  name: string,
  email: string,
  message: string,
  phone: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.HOST_EMAIL_ADDRESS as string,
    subject: "New contact email",
    reply_to: email,
    react: AdminNotificationEmail({
      name,
      message,
      email,
      phone,
    }),
  });
};

export const sendWelcomeEmail = async (name: string, email: string) => {
  const firstName = name.split(" ")[0];
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to Konjo habesha shop",
    react: WelcomeEmail({ firstName }),
  });
};

export const sendOrderConfirmationEmail = async (
  customerName: string,
  orderNumber: string,
  orderDate: string,
  items: OrderItemsType[],
  totalAmount: number,
  email: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to Konjo habesha shop",
    react: OrderConfirmationEmail({
      customerName,
      orderNumber,
      orderDate,
      items,
      totalAmount,
    }),
  });
};

export const sendNewsLetterSubscriptionConfirmationEmail = async (
  name: string,
  email: string,
  token: string,
) => {
  const firstName = name.split(" ")[0];
  const unsubscribeUrl = `https://konjo-habesha-fashion.vercel.app/newsletter?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Newsletter Subscription confirmation",
    react: NewsletterEmail({
      firstName,
      unsubscribeUrl,
    }),
  });
};
