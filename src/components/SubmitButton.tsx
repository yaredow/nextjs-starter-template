"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  isPending: boolean;
  showTwoFactor?: boolean;
};

export default function SubmitButton({
  isPending,
  showTwoFactor,
}: SubmitButtonProps) {
  return (
    <Button disabled={isPending} type="submit">
      {isPending ? (
        <Loader2 className="mx-auto flex min-h-screen animate-pulse items-center justify-center" />
      ) : !showTwoFactor ? (
        "Confirm"
      ) : (
        "Submit"
      )}
    </Button>
  );
}
