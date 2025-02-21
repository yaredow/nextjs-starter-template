"use client";

import { MenuIcon, MoveRight } from "lucide-react";
import React from "react";

import { navLinks } from "@/lib/constants";
import UserButton from "@/modules/auth/ui/components/user-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import NavLink from "./nav-link";
import UserMenu from "./user-menu";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Header() {
  const { data: session } = authClient.useSession();
  const user = session?.user || {};

  return (
    <header className="text-secondary-body sticky inset-0 inset-y-0 right-0 z-10 w-full border-b bg-background px-4 py-3 dark:text-white md:px-12">
      <nav className="flex items-center justify-between">
        Logo
        <div className="flex flex-row gap-8">
          <div className="hidden md:flex">
            <ul className="font-main flex gap-[1.2rem]">
              {navLinks.map((navLink, index) => (
                <li key={index}>
                  <NavLink href={navLink.src}>{navLink.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden cursor-pointer md:flex md:flex-row md:items-center md:gap-8">
            {session ? (
              <UserButton />
            ) : (
              <Link href="/login">
                <Button variant="link">Sign in</Button>
              </Link>
            )}
          </div>
        </div>
        <div className="cursor-pointer text-black dark:text-white md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="text-black dark:text-white">
              <div className="top-2">
                <Avatar>
                  <AvatarImage
                    className="h-10 w-10 rounded-full"
                    src={session?.user?.image || ""}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <hr className="mt-6 w-full flex-grow" />

              <div className="mt-8 flex flex-col gap-6">
                <div className="flex">
                  <ul className="font-main -mx-2 flex flex-col gap-[1.2rem]">
                    {navLinks.map((navLink, index) => (
                      <li key={index}>
                        <NavLink href={navLink.src}>{navLink.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="w-full flex-grow" />

                <div className="mt-[10px] flex justify-between gap-[8px]">
                  <div className="flex flex-row gap-[5px]">
                    <Button
                      variant="link"
                      className="flex flex-row gap-2 text-lg"
                    >
                      Login
                      <span>
                        <MoveRight />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
