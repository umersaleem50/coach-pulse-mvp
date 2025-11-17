import { Link } from "react-router";
import Logo from "../logo";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

function AppSidebarHeader() {
  const { state } = useSidebar();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size={"lg"} asChild>
            <Link to="/">
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Logo iconOnly={true} />
              </div>
              {state === "expanded" && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Coach Pulse</span>

                  <span className="truncate text-xs text-foreground/80">
                    Coach Account
                  </span>
                </div>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export default AppSidebarHeader;
