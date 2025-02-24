"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";

interface StripeSuccessProps {
  userId: string;
}

export const StripeSuccess = ({ userId }: StripeSuccessProps) => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const syncStripeData = trpc.stripe.syncStripeData.useMutation();
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });
  const stripeCustomerId = user.stripeCustomerId;
  const isSubscriptionActive = user.stripeSubscriptionStatus === "active";

  if (!stripeCustomerId) {
    router.push("/");
  }

  useEffect(() => {
    if (stripeCustomerId) {
      syncStripeData.mutate(
        { customerId: stripeCustomerId },
        {
          onSuccess: () => {
            utils.users.getUser.invalidate({ id: userId });
            router.push("/");
          },
          onError: (error) => {
            console.error(error);
          },
        },
      );
    } else {
      console.warn("stripeCustomerId is missing from session");
    }
  }, [stripeCustomerId, userId]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      {syncStripeData.isPending ? (
        <p>Syncing your subscription data...</p>
      ) : isSubscriptionActive === true ? (
        <p>Your subscription is now active!</p>
      ) : isSubscriptionActive === false ? (
        <p>It seems you are not subscribed.</p>
      ) : (
        <p>Loading subscription status...</p>
      )}
    </div>
  );
};
