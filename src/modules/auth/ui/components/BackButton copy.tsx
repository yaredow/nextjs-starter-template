import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  backButtonHref: string;
  backButtonLabel: string;
};

export default function BackButton({
  backButtonHref,
  backButtonLabel,
}: BackButtonProps) {
  return (
    <Button
      className="mx-auto flex items-center justify-center"
      variant="link"
      asChild
    >
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  );
}
