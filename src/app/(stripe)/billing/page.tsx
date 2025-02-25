import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { UserBillingInformations } from "@/modules/users/ui/components/user-billing-informations";
import { HydrateClient, trpc } from "@/trpc/server";
import { auth } from "@/lib/auth";

const BillingPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  void trpc.users.getUser.prefetch({ id: session.user.id });

  return (
    <HydrateClient>
      <UserBillingInformations userId={session.user.id} />
    </HydrateClient>
  );
};

export default BillingPage;
