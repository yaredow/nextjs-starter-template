import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { TwoFactorForm } from "@/modules/auth/ui/components/two-factor-form";
import { auth } from "@/lib/auth";

const TwoFactorPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center">
      <TwoFactorForm />
    </div>
  );
};

export default TwoFactorPage;
