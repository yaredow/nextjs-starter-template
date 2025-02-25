import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { syncStripeDataToDatabase } from "@/modules/stripe/utils/sync-stripe-data";
import { getUser } from "@/modules/users/utils/get-user";
import { auth } from "@/lib/auth";

const SuccessPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const user = await getUser(session.user.id);
  const stripeCustomerId = user?.stripeCustomerId;

  if (!stripeCustomerId) {
    redirect("/");
  }

  return redirect("/");
};

export default SuccessPage;
