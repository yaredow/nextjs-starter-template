"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "../auth/CardWrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";

export default function PasswordResetForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ResetPasswordFormSchema>,
  ) => {};

  return (
    <CardWrapper
      title="Reset your password"
      description="Provide the information below to rest your password"
      backButtonHref="/auth/signin"
      backButtonLabel="Back to sign in"
    >
      <Form {...form}>
        <form
          className="grid gap-4 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />
          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton isPending={isLoading} />
        </form>
      </Form>
    </CardWrapper>
  );
}
