"use client";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { FaL } from "react-icons/fa6";
import { SignUpInput, SignUpSchema } from "@/modules/auth/schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hook/use-toast";
import { Tv } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpInput) => {
    await authClient.signUp.email(values, {
      onRequest: () => {
        setIsLoading(true);
      },
      onResponse: () => {
        setIsLoading(false);
      },
      onError: (ctx) => {
        setIsLoading(false);
        toast({
          description: ctx.error.message,
          variant: "destructive",
        });
      },
      onSuccess: (ctx) => {
        setIsLoading(false);
        toast({
          description: "You have successfully signed up!",
        });
        router.push("/");
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-grow items-center justify-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="First Name"
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
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Email"
                      type="email"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
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
          <SubmitButton isPending={isLoading} />
        </div>
      </form>
    </Form>
  );
}
