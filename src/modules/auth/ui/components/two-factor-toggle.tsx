"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hook/use-toast";
import { trpc } from "@/trpc/client";

interface TwoFactorToggleProps {
  isTwoFactorEnabled: boolean;
}

export function TwoFactorToggle({ isTwoFactorEnabled }: TwoFactorToggleProps) {
  const [isEnabled, setIsEnabled] = useState(isTwoFactorEnabled);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleToggle = async () => {
    if (isEnabled) {
      setShowPasswordPrompt(true);
    } else {
      setShowPasswordPrompt(true);
    }
  };

  const handleEnable2FA = async () => {
    setIsLoading(true);
    await authClient.twoFactor.enable({
      password: password,
    });
  };

  const handleVerify2FA = async () => {
    setIsLoading(true);
    await authClient.twoFactor.verifyTotp(
      {
        code: verificationCode,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          setShowVerificationPrompt(false);
          setIsEnabled(true);
          toast({
            title: "2FA Enabled",
            description: "Two-factor authentication has been enabled",
          });
        },
        onError: (ctx) => {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              ctx.error.message || "Failed to verify two-factor code",
          });
        },
      },
    );
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    await authClient.twoFactor.disable(
      {
        password: password,
      },
      {
        onSuccess: () => {
          setIsEnabled(false);
          setShowPasswordPrompt(false);
          toast({
            title: "2FA Disabled",
            description: "Two-factor authentication has been disabled",
          });
        },
        onError: (ctx) => {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              ctx.error.message ||
              "Failed to disable two-factor authentication",
          });
        },
      },
    );
  };

  const handleSendOtp = async () => {
    const { error } = await authClient.twoFactor.sendOtp();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send verification code",
      });
    }
  };

  const verifyPassword = trpc.users.verifyUserPassword.useMutation({
    onSuccess: async () => {
      setShowPasswordPrompt(false);
      if (isEnabled) {
        handleDisable2FA();
      } else {
        await handleSendOtp();
        setShowVerificationPrompt(true);
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to verify password",
      });
    },
  });

  return (
    <>
      <Switch
        checked={isEnabled}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        aria-label="Toggle 2FA"
      />

      <Dialog
        open={showPasswordPrompt}
        onOpenChange={() => setShowPasswordPrompt(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEnabled ? "Disable" : "Enable"} Two-Factor Authentication
            </DialogTitle>
            <DialogDescription>
              Please enter your password to confirm this action.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowPasswordPrompt(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={() => verifyPassword.mutate({ password })}
            >
              {verifyPassword.isPending
                ? "Please wait..."
                : isEnabled
                  ? "Disable"
                  : "Enable"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showVerificationPrompt}
        onOpenChange={() => setShowVerificationPrompt(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Please enter the verification code sent to your email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Verification Code
              </Label>
              <Input
                type="text"
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowVerificationPrompt(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleVerify2FA}
            >
              Verify
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
