import UpdatePasswordForm from "@/components/form/update-password-form";
import UpdateUserDataForm from "@/components/form/update-user-data-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = () => {
  return {
    title: "Update Profile",
  };
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-md">
      <Tabs defaultValue="profile">
        <div className="flex min-h-[75vh] flex-col items-center justify-center">
          <TabsList className="grid w-full grid-cols-2 border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent className="min-h-[350px] w-full" value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>
                  Make changes to your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <UpdateUserDataForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent className="min-h-[350px] w-full" value="password">
            <Card>
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                  Change your password. After saving, you&apos;ll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <UpdatePasswordForm />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
