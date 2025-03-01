import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdatePasswordForm } from "@/modules/auth/ui/components/update-password-form";
import { TwoFactorToggle } from "@/modules/auth/ui/components/two-factor-toggle";
import { HydrateClient, trpc } from "@/trpc/server";

export default async function SettingPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  void trpc.users.getUser.prefetch({ id: session.user.id });

  return (
    <div className="mx-auto w-full max-w-4xl py-8">
      <h1 className="mb-6 text-2xl font-bold">Account Settings</h1>

      <div className="space-y-6">
        {/* Password Update Section */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <HydrateClient>
                <TwoFactorToggle userId={session.user.id} />
              </HydrateClient>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
