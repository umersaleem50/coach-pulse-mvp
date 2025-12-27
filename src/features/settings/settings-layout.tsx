import SettingsSidebar from "@/features/settings/settings-sidebar";
import { Page } from "@/shared/components/page";

import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { Outlet } from "react-router";

function SettingsLayout() {
  return (
    <Page>
      <Page.Header title="Settings" />
      <SidebarProvider>
        <SettingsSidebar />
        <SidebarInset className="md:p-4">
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </Page>
  );
}

export default SettingsLayout;
