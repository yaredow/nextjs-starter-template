import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { StripeSuccess } from "@/modules/stripe/ui/components/stripe-success";
import { auth } from "@/lib/auth";

const SuccessPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <StripeSuccess
      stripeCustomerId={session.user.stripeCustomerId ?? undefined}
    />
  );
};

export default SuccessPage;
