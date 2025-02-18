import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string({ required_error: "Password is required" }).min(1, {
    message: "Password cannot be empty",
  }),
});

export type SignInInput = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(100, { message: "Name cannot exceed 100 characters" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must include at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must include at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must include at least one special character",
      }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof SignUpSchema>;
