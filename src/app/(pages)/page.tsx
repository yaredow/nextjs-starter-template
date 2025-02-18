import { HydrateClient, trpc } from "@/trpc/server";
import { Client } from "./client";

export default function Home() {
  void trpc.hello.prefetch({ text: "hello" });

  return (
    <HydrateClient>
      <Client />
    </HydrateClient>
  );
}
