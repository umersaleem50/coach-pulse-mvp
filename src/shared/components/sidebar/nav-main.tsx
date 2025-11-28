import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { usePinnedProjects } from "@/features/pin-projects/hooks/usePinnedProjects";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { pathname } = useLocation();
  const { projects } = useProjects();
  const { data: pinnedProjects, isPending: isLoadingPinnedProjects } =
    usePinnedProjects();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {/* {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.url}
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null} */}
              {/* {pinnedProjects?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {projects?.map((project) => (
                        <SidebarMenuSubItem key={project.id}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === project.url}
                          >
                            <Link to={"/projects/" + project.id}>
                              <span>{project.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/projects"}
                        >
                          <Link to={"/projects/"}>
                            <span>Show All</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null} */}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
