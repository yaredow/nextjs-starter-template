import Heros from "@/components/landing-page/hero";
import KeyFeatures from "@/components/landing-page/key-features";
import { Separator } from "@/components/ui/separator";
import { HydrateClient, trpc } from "@/trpc/server";
import { Client } from "./client";

export default function Home() {
  void trpc.hello.prefetch({ text: "Hello" });

  return (
    <HydrateClient>
      <Client />
    </HydrateClient>
  );
}
