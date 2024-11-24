import "../globals.css";
import React from "react";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";

export default function ManagerLayout({
       children,
     }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center justify-between border-b px-4"></header>
          {children}
        </SidebarInset>
      </SidebarProvider>
  );
}