import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin");
  }

  return <main>Profile</main>;
}
