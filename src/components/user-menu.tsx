"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";

export default function UserMenu() {
  const router = useRouter();
  const isLoggedIn = false;
  const isAdmin = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {isLoggedIn ? (
            <Image
              src={"#"}
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
      {isAdmin ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Your account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/account">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account/settings">Settings</Link>
          </DropdownMenuItem>
          {isAdmin ? (
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
}
