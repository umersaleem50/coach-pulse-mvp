import { ChevronRight, Ellipsis, Menu, type LucideIcon } from "lucide-react";

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
import { usePinnedProjects } from "@/features/pin-projects/hooks/usePinnedProjects";
import ProjectCardActions from "@/features/projects/components/ProjectCardActions";

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

  const { data: pinnedProjects, isPending: isLoadingPinnedProjects } =
    usePinnedProjects();

  const [projects, ...otherItems] = items;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          key={projects.title}
          asChild
          defaultOpen={projects.isActive}
        >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={projects.title}
              isActive={pathname === projects.url}
            >
              <Link to={projects.url}>
                <projects.icon />
                <span>{projects.title}</span>
              </Link>
            </SidebarMenuButton>
            {pinnedProjects?.length ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction className="data-[state=open]:rotate-90">
                    <ChevronRight />
                    <span className="sr-only">Toggle</span>
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {pinnedProjects?.map(({ project }) => (
                      <SidebarMenuSubItem key={project.id}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === `/projects/${project.id}`}
                        >
                          <Link to={`/projects/${project.id}`}>
                            <span>{project.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                        <SidebarMenuAction>
                          <ProjectCardActions project={project}>
                            <Ellipsis />
                          </ProjectCardActions>
                        </SidebarMenuAction>
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
            ) : null}
          </SidebarMenuItem>
        </Collapsible>
        {otherItems.map((item) => (
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
              {item.items?.length ? (
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
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
