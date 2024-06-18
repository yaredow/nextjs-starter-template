import { z } from "zod";

export const UpdateAccountFormSchema = z.object({
  name: z.string().refine(
    (value) => {
      if (value !== "") {
        const names = value.trim().split(" ");
        return names.length === 2 && names.every((name) => name.length > 0);
      }
    },
    {
      message: "Please enter your full name with both first and last names.",
    },
  ),
});

export const UpdatePasswordFormSchema = z
  .object({
    currentPassword: z.string().trim().min(8),
    newPassword: z.string().trim().min(8),
    passwordConfirm: z.string().trim().min(8),
  })
  .refine(
    (data) => {
      return data.newPassword === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  twoFactor: z.optional(z.string()),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    passwordConfirm: z.string().trim().min(8),
  })
  .refine(
    (data) => {
      return data.newPassword === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );

export const SignupFormSchema = z
  .object({
    name: z.string().refine(
      (value) => {
        if (value !== "") {
          const names = value.trim().split(" ");
          return names.length === 2 && names.every((name) => name.length > 0);
        }
      },
      {
        message: "Please enter your full name with both first and last names.",
      },
    ),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    passwordConfirm: z.string().trim().min(8),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    },
  );

export const ContactUsFromSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      fields?: Record<string, string>;
      issues?: string[];
    }
  | undefined;

export const CreateProductFormSchema = z.object({
  name: z
    .string()
    .max(400, { message: "Product name cannot exceed 400 characters" })
    .min(1, { message: "Name is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  sizes: z
    .array(z.string())
    .min(1, { message: "At least one size is required" }),
  stockQuantity: z.coerce
    .number()
    .min(1, { message: "Stock quantity must be a positive number" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(2000, { message: "Description cannot exceed 2000 characters" }),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const contactFormSchema = z.object({
  name: z.string().refine(
    (value) => {
      if (value !== "") {
        const names = value.trim().split(" ");
        return names.length === 2 && names.every((name) => name.length > 0);
      }
    },
    {
      message: "Please enter your full name with both first and last names.",
    },
  ),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  message: z.string().max(1000, {
    message: "Message must not be longer than 1000 characters.",
  }),
});

export const newsLetterFormSchema = z.object({
  fullName: z.string().refine(
    (value) => {
      if (value !== "") {
        const names = value.trim().split(" ");
        return names.length === 2 && names.every((name) => name.length > 0);
      }
    },
    {
      message: "Please enter your full name with both first and last names.",
    },
  ),
  email: z.string().email(),
});
