"use client";

import { trpc } from "@/trpc/client";
import { Divide } from "lucide-react";

export const Client = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Hello" });
  return <div>User from client said: {data.greeting}</div>;
};
