import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";

function PageHeader({
  title,
  description,
  actions,
}: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center py-1 px-2 sm:py-2 sm:px-3 md:px-4 md:py-3 border-b">
      <SidebarTrigger />

      <Separator orientation="vertical" className="mx-4 " />
      <ThemeToggle />
      <Separator orientation="vertical" className="mx-4 " />
      <div className="flex flex-col space-y-1">
        <h2>{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="ml-auto">{actions}</div>
    </div>
  );
}

function Page({
  children,
  title,
  description,
  className,
  actions,
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className={cn(className, "flex flex-col h-full")}>
      <PageHeader title={title} description={description} actions={actions} />
      {/* <PageContent>{children}</PageContent> */}
      {children}
    </div>
  );
}

export { Page, PageHeader };
