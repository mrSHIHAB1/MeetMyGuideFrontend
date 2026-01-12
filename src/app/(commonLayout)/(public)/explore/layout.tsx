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
    <div className="flex min-h-screen items-start">
      <PublicDashBoard />



      <div className="flex flex-1 flex-col">
        <main className="flex-1 bg-muted/10 p-4 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
