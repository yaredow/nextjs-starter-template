import { z } from "zod";

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = baseSchema.extend({
  name: z.string().min(1, "Name is required"),
});

export const signInSchema = baseSchema;

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;

export type userAuthData = SignUpData | SignInData;
