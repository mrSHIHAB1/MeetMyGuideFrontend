import ToursManagementHeader from "@/components/modules/Admin/ToursManagement/AdminsManagementHeader";
import TourFilter from "@/components/modules/guide/TourFilter";
import { ToursList } from "@/components/modules/guide/ToursList";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllToursByFilter } from "@/services/guide/tourMangement";
import { Suspense } from "react";

const MyToursListingPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  // Build filter object from search params
  const filters = {
    destination: searchParamsObj.destination as string | undefined,
    category: searchParamsObj.category as string | undefined,
    minPrice: searchParamsObj.minPrice ? Number(searchParamsObj.minPrice) : undefined,
    maxPrice: searchParamsObj.maxPrice ? Number(searchParamsObj.maxPrice) : undefined,
  };

  const tourResult = await getAllToursByFilter(filters);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tours</h1>
      </div>
      <ToursManagementHeader></ToursManagementHeader>
      {/* Search and Filters */}
      <TourFilter />

      <Suspense fallback={<TableSkeleton columns={3} rows={6} />}>
        <ToursList tours={tourResult?.data || []} />
      </Suspense>
    </div>
  );
};

export default MyToursListingPage;
