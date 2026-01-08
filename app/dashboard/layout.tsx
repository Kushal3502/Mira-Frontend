"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ListIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/projects": "Projects",
    "/dashboard/chat": "Chat",
    "/dashboard/settings": "Settings",
    "/dashboard/profile": "Profile",
  };
  return titles[pathname] || "Dashboard";
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - Fixed, Full Height */}
      <div className="hidden lg:block">
        <Sidebar isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Dashboard Header - Spans rest of width */}
        <header className="sticky top-0 z-40 bg-background border-b border-zinc-700">
          <div className="grid grid-cols-14 h-full">
            {/* <div className="border-b border-dashed border-zinc-700 col-span-1 py-3 hidden lg:block" /> */}

            <div className="p-3 flex items-center justify-between col-span-14 lg:col-span-12">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <ListIcon className="size-5" />
                </Button>
                <h1 className="text-xl font-semibold">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-2"></div>
            </div>

            {/* <div className="border-b border-dashed border-zinc-700 col-span-1 py-3 hidden lg:block" /> */}
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-14 min-h-full">
            <section className="col-span-1 py-3 hidden lg:block" />
            <section className="col-span-14 lg:col-span-12 min-h-full p-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </section>
            <section className="col-span-1 py-3 hidden lg:block" />
          </div>
        </main>
      </div>
    </div>
  );
}
