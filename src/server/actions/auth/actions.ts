"use server";

import { auth, signIn } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import prisma from "@/lib/prisma";
import {
  generatePasswordResetToken,
  generateTwoFactorConfirmationToken,
  generateVerificationToken,
} from "@/lib/tokens";
import {
  ErrorAndSuccessType,
  ResetPasswordFormSchema,
  SignupFormSchema,
  UpdateAccountFormSchema,
  UpdatePasswordFormSchema,
  forgotPasswordFormSchema,
  loginFormSchema,
} from "@/lib/schema";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getVerificationTokenByToken } from "@/data/verification-token";
import {
  sendPasswordResetToken,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "@/server/actions/email/email";

export async function authenticate(
  values: z.infer<typeof loginFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = loginFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { email, password, twoFactor } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email is not available" };
  }

  if (!existingUser.emailVerified && existingUser.name) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      existingUser.name,
    );

    return { success: "Verification email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (twoFactor) {
      const twoFactorCode = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorCode) {
        return { error: "Invalid code" };
      }

      if (twoFactorCode.token !== twoFactor) {
        return { error: "Invalid code" };
      }

      const twoFactorCodeExpires = new Date(twoFactorCode.expires) < new Date();

      if (twoFactorCodeExpires) {
        return { error: "The code has expired" };
      }

      await prisma.twoFactorToken.delete({
        where: { id: twoFactorCode.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorConfirmation = await generateTwoFactorConfirmationToken(
        existingUser.email,
      );

      await sendTwoFactorTokenEmail(
        twoFactorConfirmation.email,
        twoFactorConfirmation.token,
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });

    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function forgotPasswordAction(
  values: z.infer<typeof forgotPasswordFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedField = forgotPasswordFormSchema.safeParse({
    email: values.email,
  });

  if (!validatedField.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedField.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User doesn't exist with that email" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetToken(
    passwordResetToken.email,
    passwordResetToken.token,
    user.name as string,
  );

  return { success: "Password reset token sent successfully" };
}

export async function registerAction(
  values: z.infer<typeof SignupFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = SignupFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    name,
  );

  return { success: "Confirmation email sent" };
}

export async function resetPasswordAction(
  values: z.infer<typeof ResetPasswordFormSchema>,
  token: string,
): Promise<ErrorAndSuccessType> {
  if (!token) {
    return { error: "Token not found" };
  }

  const validatedFields = ResetPasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { newPassword } = validatedFields.data;

  const existingResetPasswordToken = await getPasswordResetTokenByToken(token);

  if (!existingResetPasswordToken) {
    return { error: "Token not found" };
  }

  const isTokenExpired =
    new Date(existingResetPasswordToken.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Token expired" };
  }

  const user = await getUserByEmail(existingResetPasswordToken.email);

  if (!user) {
    return { error: "User not found" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingResetPasswordToken.id },
  });

  return { success: "Password reseted successfully" };
}

export async function tokenVerificationAction(
  token: string,
): Promise<ErrorAndSuccessType> {
  const existingVerification = await getVerificationTokenByToken(token);

  if (!existingVerification) {
    return { error: "Token not found" };
  }

  const isTokenExpired = new Date(existingVerification.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Token has expired" };
  }

  const user = await getUserByEmail(existingVerification.email);

  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: existingVerification.email,
    },
  });

  await sendWelcomeEmail(user.name!, user.email!);

  await prisma.verificationToken.delete({
    where: { id: existingVerification.id },
  });

  return { success: "Email successfuly verified" };
}

export async function updatePasswordAction(
  values: z.infer<typeof UpdatePasswordFormSchema>,
  userId: string,
): Promise<ErrorAndSuccessType> {
  const validatedFields = UpdatePasswordFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "invalid form data",
    };
  }

  const { currentPassword, newPassword, passwordConfirm } =
    validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      return { error: "Unauthorized access" };
    }

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    if (isCorrectPassword) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      });
    }

    return { success: "Password updated successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateUserData(
  values: z.infer<typeof UpdateAccountFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = UpdateAccountFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const name = validatedFields.data.name;

  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized access");
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    revalidatePath("/");

    return { success: "User account updated successfully" };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function uploadUserProfileImage(
  formData: FormData,
): Promise<ErrorAndSuccessType> {
  const userId = formData.get("userId") as string;
  const image = formData.get("image") as File;
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  if (!image) {
    return { error: "Image not found" };
  }

  const uploadResult = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            tags: ["konjo-habesha-next-js"],
            upload_preset: "konjo-habesha",
          },
          function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    },
  );

  const user = await getUserById(userId);

  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      image: uploadResult?.url,
    },
  });

  revalidatePath("/");
  return { success: "Image uploaded successfully" };
}
