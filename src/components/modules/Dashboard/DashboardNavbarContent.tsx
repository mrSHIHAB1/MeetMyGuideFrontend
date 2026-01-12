"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { ArrowRightToLine, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* LEFT MIDDLE HINGE (Mobile Only) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            className="
              fixed left-0 top-1/2 -translate-y-1/2
              z-50
              h-16 w-5
              rounded-r-lg
              bg-white
              text-primary-foreground
              shadow-xl
              border-2
              md:hidden
              flex items-center justify-center
              active:scale-95
              transition
            "
          >
            <ArrowRightToLine className="h-4 w-4 text-gray-500" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <DashboardMobileSidebar
            userInfo={userInfo}
            navItems={navItems || []}
            dashboardHome={dashboardHome || ""}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default DashboardNavbarContent;
