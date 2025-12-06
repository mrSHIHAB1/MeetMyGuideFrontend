import BookingsFilter from "@/components/modules/guide/BookingsFilter";
import BookingsTable from "@/components/modules/guide/BookingsTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getGuideBookings } from "@/services/guide/guideBookingsManagement";
import { Suspense } from "react";

const GuideUpcomingBookingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  // Build filter object from search params
  const filters = {
    status: searchParamsObj.status as string | undefined,
  };

  const bookingsResult = await getGuideBookings(filters);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Upcoming Bookings</h1>
      </div>

      {/* Status Filter */}
      <BookingsFilter />

      <Suspense fallback={<TableSkeleton columns={7} rows={10} />}>
        <BookingsTable bookings={bookingsResult?.data || []} />
      </Suspense>
    </div>
  );
};

export default GuideUpcomingBookingsPage;

