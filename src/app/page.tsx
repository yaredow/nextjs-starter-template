import Heros from "@/components/landing-page/hero";
import KeyFeatures from "@/components/landing-page/key-features";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      <Heros />
      <Separator />
      <KeyFeatures />
    </div>
  );
}
