import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import DashboardNavbars from "@/components/shared/DashboardNavbar";
import PublicNavbar from "@/components/shared/PublicNavbar";
import React from "react";
export const dynamic = "force-dynamic";
const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* <PublicNavbar /> */}
      <DashboardNavbars></DashboardNavbars>
      <div className="flex min-h-screen">

        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <DashboardNavbar />

          <main className="flex-1 bg-muted/10 p-4 md:p-6">

            <div className="">{children}</div>

          </main>
        </div>
      </div>
    </>
  );
};

export default CommonDashboardLayout;
