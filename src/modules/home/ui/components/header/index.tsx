import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b px-12 py-4" data-testId="side-header">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Next-starter</h1>
        <div className="flex items-center gap-x-4">
          <Button variant="ghost" size="icon">
            <Icons.gitHub className="size-6" />
          </Button>
          <ThemeToggle />
          <Button>Sign In</Button>
        </div>
      </div>
    </header>
  );
};
