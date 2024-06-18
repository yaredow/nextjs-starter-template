import prisma from "@/lib/prisma";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorConfirmationToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorConfirmationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorConfirmationToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorConfirmationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
