"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function Social() {
  const handleSocialClick = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/account" });
  };

  return (
    <div className="flex w-full flex-row items-center justify-between space-x-2">
      <Button
        onClick={() => handleSocialClick("google")}
        type="submit"
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        onClick={() => handleSocialClick("facebook")}
        type="submit"
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FaFacebook className="h-5 w-5 text-blue-500 dark:text-blue-400" />
      </Button>
    </div>
  );
}
