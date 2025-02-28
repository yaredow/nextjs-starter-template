"use client";

import { Check, LogOutIcon, Monitor, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { User } from "better-auth";

interface UserButtonProps {
  user: User;
}

export default function UserButton({ user }: UserButtonProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { name, email, image } = user;
  console.log({ image });

  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email?.charAt(0).toUpperCase() ?? "U");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="relative outline-none">
        <Avatar className="relative size-10 rounded-full border border-neutral-300 transition hover:opacity-75">
          {image ? (
            <Image
              src={image}
              alt="User Avatar"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>Logged in as {name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex flex-row items-center gap-2">
            <Monitor className="mr-2 size-4" /> Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
