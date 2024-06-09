"use client";

import { SidebarProvider } from "@/context/SidebarContext";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { DashboardNavbar } from "./navbar";
import { DashboardSidebar } from "./sidebar";

const DashboardLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
};

const DashboardLayoutContent: FC<PropsWithChildren> = function ({ children }) {
  return (
    <>
      <DashboardNavbar />
      <div className="mt-20 flex">
        <div
          id="main-content"
          className={twMerge(
            "relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900",
          )}
        >
          <div className="container mx-auto flex max-w-7xl">
            <DashboardSidebar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
