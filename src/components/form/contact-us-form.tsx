"use client";

import { ContactUsFromSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import SubmitButton from "../SubmitButton";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { contactUsAction } from "@/server/actions/contact-us/actions";

export default function ContactUsForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ContactUsFromSchema>>({
    resolver: zodResolver(ContactUsFromSchema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ContactUsFromSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      contactUsAction(values)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            form.reset();
          } else {
            setError(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Something went wrong");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-6"
      >
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Full name" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="w-full md:w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Email" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Phone" type="phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
