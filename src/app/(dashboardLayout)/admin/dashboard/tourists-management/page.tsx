import TouristsFilter from "@/components/modules/Admin/TouristsManagement/TouristsFilter";
import TouristsManagementHeader from "@/components/modules/Admin/TouristsManagement/TouristsManagementHeader";
import TouristsTable from "@/components/modules/Admin/TouristsManagement/TouristsTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getTourists } from "@/services/admin/touristsManagement";
import { Suspense } from "react";

const AdminTouristsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  // Add role=TOURIST to always filter only tourist users
  const paramsWithRole = {
    ...searchParamsObj,
    role: "TOURIST"
  };

  const queryString = queryStringFormatter(paramsWithRole);
  const touristsResult = await getTourists(queryString);

  return (
    <div className="space-y-6">
      <TouristsManagementHeader />

      {/* Search, Filters */}
      <TouristsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <TouristsTable tourists={touristsResult?.data || []} />

      </Suspense>
    </div>
  );
};

export default AdminTouristsManagementPage;
