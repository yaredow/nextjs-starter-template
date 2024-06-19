import { v4 as uuid4 } from "uuid";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingVerficationToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (existingVerficationToken) {
    await prisma.verificationToken.delete({
      where: { id: existingVerficationToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingPasswordResetToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });

  if (existingPasswordResetToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingPasswordResetToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorConfirmationToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingTwoFactorToken = await prisma.twoFactorToken.findFirst({
    where: { email },
  });

  if (existingTwoFactorToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingTwoFactorToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return twoFactorToken;
};
