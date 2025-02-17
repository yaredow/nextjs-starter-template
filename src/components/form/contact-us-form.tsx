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
import SubmitButton from "../SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { initializeTraceState } from "next/dist/trace";

export default function ContactUsForm() {
  const isPending = false;
  const form = useForm<z.infer<typeof ContactUsFromSchema>>({
    resolver: zodResolver(ContactUsFromSchema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ContactUsFromSchema>) => {};

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

          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </Form>
  );
}
