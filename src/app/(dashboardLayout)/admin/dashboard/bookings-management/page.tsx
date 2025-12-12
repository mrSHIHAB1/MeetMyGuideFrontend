import BookingsFilter from "@/components/modules/Admin/BookingsManagement/BookingsFilter";
import BookingsManagementHeader from "@/components/modules/Admin/BookingsManagement/BookingsManagementHeader";
import BookingsTable from "@/components/modules/Admin/BookingsManagement/BookingsTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllBookings, getFilteredBookings } from "@/services/admin/bookingsManagement";
import { Suspense } from "react";

const AdminBookingsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const bookingsResult = await getFilteredBookings(queryString);

  return (
    <div className="space-y-6">
      <BookingsManagementHeader />

      {/* Search, Filters */}
      <BookingsFilter />

      <Suspense fallback={<TableSkeleton columns={7} rows={10} />}>
        <BookingsTable bookings={bookingsResult?.data || []} />

      </Suspense>
    </div>
  );
};

export default AdminBookingsManagementPage;
