import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";

import { TwoFactorForm } from "@/modules/auth/ui/components/two-factor-form";
import { auth } from "@/lib/auth";

const TwoFactorPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 sm:px-6">
      <div className="absolute top-8 md:top-12">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="h-8 w-auto"
        />
      </div>

      <div className="w-full max-w-md">
        <TwoFactorForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Having trouble?{" "}
          <a
            href="/support"
            className="underline underline-offset-4 hover:text-primary"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
};

export default TwoFactorPage;
