"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { Icons } from "@/components/shared/icons";
import { capitalizeFullName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";

interface UserBillingInformationsProps {
  userId: string;
}

export const UserBillingInformations = ({
  userId,
}: UserBillingInformationsProps) => {
  const router = useRouter();
  const subscribe = trpc.stripe.subscribe.useMutation();
  const [user] = trpc.users.getUser.useSuspenseQuery({ id: userId });

  const isSubscribed = !!user.stripeSubscriptionId;

  const onSubscribe = () => {
    subscribe.mutate(
      {
        priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
      },
      {
        onSuccess: (url) => {
          if (url) {
            router.push(url);
          }
        },
      },
    );
  };

  const manageSubscription = () => {
    const url = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!;

    if (url) {
      router.push(url + "?prefilled_email" + user.email);
    } else {
      throw new Error("Failed to edit payment details");
    }
  };

  return (
    <div>
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center gap-x-2"
          >
            <Icons.arrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="space-y-4 rounded-md border p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          Welcome, {capitalizeFullName(user.name)}!
        </h2>
        <p className="text-sm text-muted-foreground">
          {isSubscribed
            ? "You are subscribed! Thank you for supporting us."
            : "You are not subscribed. Subscribe to unlock premium features!"}
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-500">
                You are subscribed! Thank you for supporting us.
              </p>
            </div>
            <Button onClick={manageSubscription} variant="secondary" size="sm">
              View Plan
            </Button>
          </div>
        ) : (
          <Button onClick={onSubscribe} disabled={subscribe.isPending}>
            {subscribe.isPending ? (
              <>
                <Loader className="mr-2 animate-spin" />
                Subscribe
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
