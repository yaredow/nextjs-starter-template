"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "@/components/ui/use-toast";

import SubmitButton from "../SubmitButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { updatePasswordAction } from "@/server/actions/auth/actions";
import { UpdatePasswordFormSchema } from "@/lib/schema";

export default function UpdatePasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm<z.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordFormSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updatePasswordAction(values, user?.id as string)
        .then((data) => {
          if (data.success) {
            toast({
              description: data.success,
            });
            router.replace("/auth/signin");
          } else {
            toast({
              variant: "destructive",
              description: data.error,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Something went wrong");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Current Password"
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

        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton isPending={isPending} />
      </form>
    </Form>
  );
}
