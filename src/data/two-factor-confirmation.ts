import prisma from "@/utils/db/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: { userId },
      },
    );

    return twoFactorConfirmation;
  } catch (error) {
    console.error(error);
    return null;
  }
};
