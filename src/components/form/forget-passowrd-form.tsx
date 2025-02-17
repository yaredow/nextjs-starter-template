"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";

export default function ForgetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (value: z.infer<typeof forgotPasswordFormSchema>) => {};

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-2xl gap-6 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" type="email" />
                  </FormControl>
                  <FormMessage className="mx-2" />
                </FormItem>
              );
            }}
          />

          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton isPending={isLoading} />
        </div>
      </form>
    </Form>
  );
}
