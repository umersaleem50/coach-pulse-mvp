import { Sidebar, SidebarContent } from "../ui/sidebar";
import AppSidebarHeader from "./sidebar-header";

import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";
import { SIDEBAR_DATA } from "@/constants";

function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.navMain} />
      </SidebarContent>
      <NavUser />
    </Sidebar>
  );
}

export default AppSidebar;
