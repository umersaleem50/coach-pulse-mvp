import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="coach-pulse-theme">
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
