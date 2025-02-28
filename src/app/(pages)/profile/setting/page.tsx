import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function SettingPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-4xl py-8">
      <h1 className="mb-6 text-2xl font-bold">Account Settings</h1>

      <div className="space-y-6">
        {/* Profile section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Edit your profile details here.
            </p>
            {/* Placeholder for profile form */}
          </CardContent>
        </Card>

        {/* Security section - with minimal 2FA placeholder */}
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
              <div>{/* Placeholder for 2FA toggle */}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
