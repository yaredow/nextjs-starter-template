"use client";

import { useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { toast } from "@/hook/use-toast";

import { TwoFactorForm } from "./two-factor-form";

interface TwoFactorToggleProps {
  isTwoFactorEnabled: boolean | undefined;
}

export function TwoFactorToggle({ isTwoFactorEnabled }: TwoFactorToggleProps) {
  const [showSetup, setShowSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setupData, setSetupData] = useState<{
    secret: string;
    uri: string;
  } | null>(null);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [password, setPassword] = useState("");

  const handleToggle = async () => {
    if (isTwoFactorEnabled) {
      setShowDisableDialog(true);
    } else {
      setIsLoading(true);
      try {
        const result = await authClient.twoFactor.enable({
          password: "",
        });

        if (result.data) {
          setSetupData(result.data);
          setShowSetup(true);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to initialize 2FA setup",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    try {
      await authClient.twoFactor.disable({
        password: password,
      });

      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled",
      });
      setShowDisableDialog(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disable 2FA. Please check your password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Switch
        checked={!!isTwoFactorEnabled}
        onCheckedChange={handleToggle}
        disabled={isLoading}
        aria-label="Toggle 2FA"
      />

      {showSetup && setupData && (
        <Dialog open={showSetup} onOpenChange={setShowSetup}>
          <DialogContent className="sm:max-w-md">
            <TwoFactorForm
              secret={setupData.secret}
              uri={setupData.uri}
              onSuccess={() => {
                setShowSetup(false);
                setSetupData(null);
                toast({
                  title: "2FA Enabled",
                  description: "Two-factor authentication has been enabled",
                });
              }}
              onCancel={() => {
                setShowSetup(false);
                setSetupData(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Password confirmation dialog for disabling 2FA */}
      <Dialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <DialogContent className="sm:max-w-md">
          <h2 className="text-lg font-semibold">
            Disable Two-Factor Authentication
          </h2>
          <p className="text-sm text-muted-foreground">
            Please enter your password to confirm disabling two-factor
            authentication.
          </p>

          <div className="mt-4 space-y-4">
            <Input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDisableDialog(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisable2FA}
                disabled={isLoading || !password}
              >
                {isLoading ? "Processing..." : "Disable 2FA"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
