import React from "react";
import { SidebarInset, SidebarProvider } from "./shared/components/ui/sidebar";
import AppSidebar from "./shared/components/sidebar/app-sidebar";
import { SIDEBAR_DATA } from "./lib/constants";
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
