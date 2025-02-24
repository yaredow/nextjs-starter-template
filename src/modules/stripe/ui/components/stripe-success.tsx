"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";

interface StripeSuccessProps {
  stripeCustomerId: string | undefined;
}

export const StripeSuccess = ({ stripeCustomerId }: StripeSuccessProps) => {
  const router = useRouter();
  const syncStripeData = trpc.stripe.syncStripeData.useMutation();

  useEffect(() => {
    if (stripeCustomerId) {
      syncStripeData.mutate(
        { customerId: stripeCustomerId },
        {
          onSuccess: () => {
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
  }, [router, stripeCustomerId, syncStripeData]);

  return (
    <div>
      {syncStripeData.isPending ? (
        <p>Syncing your subscription data...</p>
      ) : (
        <p>Your subscription is now active!</p>
      )}
    </div>
  );
};
