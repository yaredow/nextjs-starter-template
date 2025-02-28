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

// Define the schema for the OTP input
const twoFactorFormSchema = z.object({
  code: z.string().min(6, "Code must be 6 digits").max(6),
});

type TwoFactorFormValues = z.infer<typeof twoFactorFormSchema>;

interface TwoFactorFormProps {
  sessionId: string;
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function TwoFactorForm({
  sessionId,
  userId,
  onSuccess,
  onCancel,
  className,
}: TwoFactorFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<TwoFactorFormValues>({
    resolver: zodResolver(twoFactorFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: TwoFactorFormValues) => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.twoFactor.verifyTotp({
        code: values.code,
        trustDevice: true,
      });

      if (data) {
        router.push("/dashboard");
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Verification failed",
          description: error.message || "Please check your code and try again.",
        });
        return;
      }

      toast({
        title: "Verification successful",
        description: "Two-factor authentication completed.",
      });

      if (onSuccess) {
        onSuccess();
      } else {
        // If using callbackURL, this might be redundant
        router.refresh();
      }
    } catch (error) {
      console.error("2FA verification error:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={className}>
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
      <CardFooter className="flex justify-between">
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            type="button"
          >
            Cancel
          </Button>
        )}
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
