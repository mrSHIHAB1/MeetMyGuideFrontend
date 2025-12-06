import PendingBookingsTable from "@/components/modules/guide/PendingBookingsTable";
import PendingRequestsFilter from "@/components/modules/guide/PendingRequestsFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getGuideBookings } from "@/services/guide/guideBookingsManagement";
import { Suspense } from "react";

const GuidePendingRequestsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const statusFilter = searchParamsObj.status as string | undefined;

  // Fetch bookings based on filter
  let bookingsResult;
  let pendingCount = 0;
  let cancelledCount = 0;

  if (!statusFilter || statusFilter === "ALL") {
    // Fetch both pending and cancelled
    const pendingResult = await getGuideBookings({ status: "PENDING" });
    const cancelledResult = await getGuideBookings({ status: "CANCELLED" });

    pendingCount = pendingResult?.data?.length || 0;
    cancelledCount = cancelledResult?.data?.length || 0;

    const allBookings = [
      ...(pendingResult?.data || []),
      ...(cancelledResult?.data || []),
    ];

    bookingsResult = {
      data: allBookings.sort((a, b) =>
        new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime()
      ),
    };
  } else {
    // Fetch only selected status
    bookingsResult = await getGuideBookings({ status: statusFilter });

    if (statusFilter === "PENDING") {
      pendingCount = bookingsResult?.data?.length || 0;
    } else if (statusFilter === "CANCELLED") {
      cancelledCount = bookingsResult?.data?.length || 0;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pending Requests</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your pending and cancelled booking requests
          </p>
        </div>
        {(!statusFilter || statusFilter === "ALL") && (
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-warning">{pendingCount}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Cancelled</div>
              <div className="stat-value text-error">{cancelledCount}</div>
            </div>
          </div>
        )}
      </div>

      {/* Status Filter */}
      <PendingRequestsFilter />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <PendingBookingsTable bookings={bookingsResult?.data || []} />
      </Suspense>
    </div>
  );
};

export default GuidePendingRequestsPage;


