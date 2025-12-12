import AdminsFilter from "@/components/modules/Admin/AdminsManagement/AdminsFilter";
import ToursManagementHeader from "@/components/modules/Admin/ToursManagement/ToursManagementHeader";
import ToursTable from "@/components/modules/tourist/ToursManagement/ToursTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTour } from "@/services/tourist/toursManagement";
import { Suspense } from "react";

const AdminTouristsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const toursResult = await getAllTour(queryString);
  console.log(toursResult)
  return (
    <div className="space-y-6">
      <ToursManagementHeader></ToursManagementHeader>

      {/* Search, Filters */}
      <AdminsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        {/* <AdminsTable admins={adminsResult?.data || []} /> */}
        <ToursTable tours={toursResult?.data} />
      </Suspense>
    </div>
  );
};

export default AdminTouristsManagementPage;
