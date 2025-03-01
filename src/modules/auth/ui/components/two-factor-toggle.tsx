"use client";

import { Suspense, useState } from "react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/trpc/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface TwoFactorToggleProps {
  userId: string;
}

export const TwoFactorToggle = ({ userId }: TwoFactorToggleProps) => {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <TwoFactorToggleSuspense userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const TwoFactorToggleSuspense = ({ userId }: TwoFactorToggleProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });
  const isTwoFactorEnabled = user?.twoFactorEnabled;
  const utils = trpc.useUtils();

  const verifyPassword = trpc.users.verifyUserPassword.useMutation({
    onSuccess: async () => {
      if (isTwoFactorEnabled) {
        handleDisable2FA();
      } else {
        await handleEnable2FA();
      }
    },
    onError: (error) => {
      toast("Error", {
        description: "Failed to verify password",
      });
    },
  });

  const handleToggle = async () => {
    setDialogOpen(true);
  };

  const handleEnable2FA = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.twoFactor.enable({
        password: password,
      });

      if (error) {
        toast("Error", {
          description: error.message,
        });
        return;
      }

      await utils.users.getUser.invalidate();

      setDialogOpen(false);
      toast("2FA Enabled", {
        description: "Two-factor authentication has been successfully enabled",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    await authClient.twoFactor.disable(
      {
        password: password,
      },
      {
        onSuccess: () => {
          utils.users.getUser.invalidate();

          setDialogOpen(false);
          toast("2FA Disabled", {
            description: "Two-factor authentication has been disabled",
          });
        },
        onError: (ctx) => {
          toast("Error", {
            description:
              ctx.error.message ||
              "Failed to disable two-factor authentication",
          });
        },
      },
    );
    setIsLoading(false);
  };

  const handleVerifyPasswordSubmit = () => {
    verifyPassword.mutate({ password });
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setPassword("");
  };

  return (
    <>
      <Switch
        checked={isTwoFactorEnabled || false}
        onCheckedChange={handleToggle}
        disabled={isLoading || verifyPassword.isPending}
        aria-label="Toggle 2FA"
      />

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isTwoFactorEnabled ? "Disable" : "Enable"} Two-Factor
              Authentication
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
                autoComplete="current-password"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || verifyPassword.isPending}
              onClick={handleVerifyPasswordSubmit}
            >
              {verifyPassword.isPending || isLoading
                ? "Please wait..."
                : isTwoFactorEnabled
                  ? "Disable"
                  : "Enable"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
