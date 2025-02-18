import Spinner from "@/components/Spinner";
import PasswordResetForm from "@/components/form/password-reset-form";
import { Suspense } from "react";

export const metadata = {
  title: "Password Reset",
};

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <PasswordResetForm />;
    </Suspense>
  );
}
