import AdminsFilter from "@/components/modules/Admin/AdminsManagement/AdminsFilter";
import ToursFilter from "@/components/modules/Admin/ToursManagement/ToursFilter";
import ToursManagementHeader from "@/components/modules/Admin/ToursManagement/ToursManagementHeader";
import ToursTable from "@/components/modules/Admin/ToursManagement/ToursTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTours } from "@/services/admin/toursManagement";
import { Suspense } from "react";

const AdminToursManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const toursResult = await getAllTours(queryString);

  return (
    <div className="space-y-6">
      <ToursManagementHeader />

      {/* Search, Filters */}
      <ToursFilter />

      <Suspense fallback={<TableSkeleton columns={7} rows={10} />}>
        <ToursTable tours={toursResult?.data || []} />

      </Suspense>
    </div>
  );
};

export default AdminToursManagementPage;
