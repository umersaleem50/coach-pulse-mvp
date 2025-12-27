import { SETTINGS_SIDEBAR_DATA } from "@/constants";
import { Badge } from "@/shared/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

import { Link, useLocation } from "react-router";

function SettingsSidebar() {
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible="none" variant="inset" className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{SETTINGS_SIDEBAR_DATA.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SETTINGS_SIDEBAR_DATA.items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton isActive={pathname === item.url} asChild>
                    <Link to={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>
                    <Badge variant={"outline"}>3</Badge>
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SettingsSidebar;
