import Spinner from "@/components/Spinner";
import VerifiyEmailForm from "@/components/form/verify-email-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <VerifiyEmailForm />
    </Suspense>
  );
}
