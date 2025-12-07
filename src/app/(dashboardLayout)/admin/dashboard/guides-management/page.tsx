import AdminsFilter from "@/components/modules/Admin/AdminsManagement/AdminsFilter";
import GuidesFilter from "@/components/modules/Admin/GuidesManagement/GuidesFilter";
import GuidesManagementHeader from "@/components/modules/Admin/GuidesManagement/GuidesManagementHeader";
import GuidesTable from "@/components/modules/Admin/GuidesManagement/GuidesTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getGuides } from "@/services/admin/guidesManagement";
import { Suspense } from "react";

const AdminGuidesManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  // Add role=GUIDE to always filter only guide users
  const paramsWithRole = {
    ...searchParamsObj,
    role: "GUIDE"
  };

  const queryString = queryStringFormatter(paramsWithRole);
  const guidesResult = await getGuides(queryString);

  return (
    <div className="space-y-6">
      <GuidesManagementHeader />

      {/* Search, Filters */}
      <GuidesFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <GuidesTable guides={guidesResult?.data || []} />

      </Suspense>
    </div>
  );
};

export default AdminGuidesManagementPage;
