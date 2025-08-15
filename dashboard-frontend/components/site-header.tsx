import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBrandGithub } from "@tabler/icons-react";

export function SiteHeader({ header }: { header?: React.ReactNode }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) sticky top-2 z-50 bg-background shadow-sm rounded-t-lg">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {header || (
          <h1 className="text-base font-medium">Siaga Capsule Dashboard</h1>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/Larz27/siaga-capsule"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
