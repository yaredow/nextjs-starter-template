import { ErrorAndSuccessType, contactFormSchema } from "@/lib/schema";
import { z } from "zod";
import { sendAdminNotificationEmail, sendContactUsEmail } from "../email/email";

export async function contactUsAction(
  values: z.infer<typeof contactFormSchema>,
): Promise<ErrorAndSuccessType> {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { name, email, message, phone } = validatedFields.data;

  try {
    await sendContactUsEmail(email, name, message);

    await sendAdminNotificationEmail(name, email, message, phone);

    return {
      success: "Thank you for contacting us! we will get back to you soon",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
