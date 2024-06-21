"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState, useTransition } from "react";

import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { useSession } from "next-auth/react";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { toast } from "@/components/ui/use-toast";
import { updateUserData } from "@/server/actions/auth/actions";
import { UpdateAccountFormSchema } from "@/lib/schema";

export default function UpdateUserDataForm() {
  const [isLoading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm<z.infer<typeof UpdateAccountFormSchema>>({
    resolver: zodResolver(UpdateAccountFormSchema),
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateAccountFormSchema>) => {
    if (values.name === user?.name) {
      setError("Name is the same as before");
      return;
    }

    setError("");
    setSuccess("");
    startTransition(() => {
      updateUserData(values).then((data) => {
        if (data.success) {
          toast({
            description: data.success,
          });
        } else {
          toast({
            description: data.error,
            variant: "destructive",
          });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Name" type="text" />
                </FormControl>
                <FormMessage className="mx-2" />
              </FormItem>
            );
          }}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton isPending={isLoading} />
      </form>
    </Form>
  );
}
