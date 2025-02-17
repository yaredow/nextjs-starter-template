"use client";

import { trpc } from "@/trpc/client";

export const Client = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "hello" });

  return <div>The person from client said: {data.greeting}</div>;
};
