"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { SignInInput, SignInSchema } from "@/modules/auth/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hook/use-toast";

import SubmitButton from "../SubmitButton";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInInput) => {
    await authClient.signIn.email(values, {
      onRequest: (ctx) => {
        setIsLoading(true);
      },
      onResponse: (ctx) => {
        setIsLoading(false);
      },
      onError: (ctx) => {
        setIsLoading(false);
        toast({
          description: "An error occurred while signing in.",
          variant: "destructive",
        });
      },
      onSuccess: (ctx) => {
        setIsLoading(false);
      },
    });
  };

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
                        disabled={isLoading}
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
                        disabled={isLoading}
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

          <SubmitButton isPending={isLoading} />
        </div>
      </form>
    </Form>
  );
}
