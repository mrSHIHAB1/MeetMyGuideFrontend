import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import PublicDashBoard from "@/components/shared/PublicDashBoard";
import React from "react";
import Image from "next/image";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <PublicDashBoard />



      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
