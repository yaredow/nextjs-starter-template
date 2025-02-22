import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b px-12 py-4" data-testid="side-header">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Next-starter</h1>
        <div className="flex items-center gap-x-4">
          <Link href="https://github.com/yaredow/nextjs-starter-template">
            <Button variant="ghost" size="icon">
              <Icons.gitHub className="size-6" />
            </Button>
          </Link>
          <ThemeToggle />
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
