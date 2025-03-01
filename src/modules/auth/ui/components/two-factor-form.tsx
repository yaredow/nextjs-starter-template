"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/hook/use-toast";
import { Icons } from "@/components/shared/icons";
import { TwoFactorFormSchema, TwoFactorFormValues } from "../../schema";

interface TwoFactorFormProps {}

export function TwoFactorForm({}: TwoFactorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(TwoFactorFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: TwoFactorFormValues) => {
    setIsLoading(true);

    const { data, error } = await authClient.twoFactor.verifyOtp({
      code: values.code,
      trustDevice: true,
    });

    if (data) {
      router.push("/");
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Please check your code and try again.",
      });
      return;
    }
  };

  return (
    <Card className="w-full border-none p-0">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Please enter the 6-digit verification code sent to your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Didn&apos;t receive a code?{" "}
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm"
                      type="button"
                      disabled={isLoading}
                    >
                      Resend code
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" disabled={isLoading} type="button">
          Cancel
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading || !form.formState.isValid}
        >
          {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Verify
        </Button>
      </CardFooter>
    </Card>
  );
}
