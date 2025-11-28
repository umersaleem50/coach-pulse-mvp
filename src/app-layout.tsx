import { SidebarInset, SidebarProvider } from "./shared/components/ui/sidebar";
import AppSidebar from "./shared/components/sidebar/app-sidebar";

import { Outlet } from "react-router";

function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppLayout;
