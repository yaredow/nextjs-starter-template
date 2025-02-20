"use client";

import { Check, LogOutIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserButton() {
  const { data: session } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const user = session?.user;
  const router = useRouter()

  const signOut = authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login")
    }
  }
})



  const avatarFallback = user?.name
    ? user.name.charAt(0).toUpperCase()
    : (user?.email.charAt(0).toUpperCase() ?? "U");
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className=" outline-none relative">
        <Avatar className="size-10 rounded-full hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>Logged in as {user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex flex-row items-center gap-2">
            <Monitor className="mr-2 size-4" /> Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => "system"}>
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
              </DropdownMenuItem>{" "}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
        >
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
