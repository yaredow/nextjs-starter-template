"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { FormSuccess } from "../FormSuccess";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { userCreateSchema } from "@/db/schema";

export default function SigninForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof userCreateSchema>>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userCreateSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-grow items-center justify-center gap-4"
      >
        <div className="flex flex-col space-y-6">
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Email"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage className="mx-2" />
                  </FormItem>
                );
              }}
            />
          </>

          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
