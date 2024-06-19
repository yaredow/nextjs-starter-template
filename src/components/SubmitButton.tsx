"use client";

import PulsatingDots from "@/components/PulsatingDots";
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
      {isPending ? <PulsatingDots /> : !showTwoFactor ? "Confirm" : "Submit"}
    </Button>
  );
}
