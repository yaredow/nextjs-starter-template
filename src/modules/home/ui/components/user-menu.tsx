"use client";

import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
        onError: (error) => {
          console.error("Error signing out:", error);
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => {
            if (!session) {
              router.replace("/signin");
            }
          }}
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {session ? (
            <Image
              src={session?.user.image || "/images/placeholder.svg"}
              alt="User profile picture"
              width={50}
              height={50}
              className="aspect-square rounded-full bg-background object-cover"
            />
          ) : (
            <UserIcon strokeWidth={1.5} />
          )}
        </Button>
      </DropdownMenuTrigger>
      {session ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/setting">Setting</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
}
