import AdminsFilter from "@/components/modules/Admin/AdminsManagement/AdminsFilter";
import AdminsManagementHeader from "@/components/modules/Admin/AdminsManagement/AdminsManagementHeader";
import AdminsTable from "@/components/modules/Admin/AdminsManagement/AdminsTable";
import ToursManagementHeader from "@/components/modules/Admin/ToursManagement/AdminsManagementHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAdmins } from "@/services/admin/adminsManagement";
import { Suspense } from "react";

const AdminTouristsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const adminsResult = await getAdmins(queryString);

  return (
    <div className="space-y-6">
     <ToursManagementHeader></ToursManagementHeader>

      {/* Search, Filters */}
      <AdminsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <AdminsTable admins={adminsResult?.data || []} />
      
      </Suspense>
    </div>
  );
};

export default AdminTouristsManagementPage;
