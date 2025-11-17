import { Sidebar, SidebarContent } from "../ui/sidebar";
import AppSidebarHeader from "./sidebar-header";

import { NavMain } from "./nav-main";
import { SIDEBAR_DATA } from "@/lib/constants";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.navMain} />
        <NavProjects projects={SIDEBAR_DATA.projects} />
      </SidebarContent>
      <NavUser user={SIDEBAR_DATA.user} />
    </Sidebar>
  );
}

export default AppSidebar;
