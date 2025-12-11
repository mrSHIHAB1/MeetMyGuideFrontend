import GuideToursManagementHeader from "@/components/modules/guide/GuideToursManagementHeader";
import TourFilter from "@/components/modules/guide/TourFilter";
import { ToursList } from "@/components/modules/guide/ToursList";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllToursByFilterForGuide } from "@/services/guide/tourMangement";
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

  const tourResult = await getAllToursByFilterForGuide(filters);

  return (
    <div className="space-y-6">

      <GuideToursManagementHeader></GuideToursManagementHeader>
      {/* Search and Filters */}
      <TourFilter />

      <Suspense fallback={<TableSkeleton columns={3} rows={6} />}>
        <ToursList tours={tourResult?.data || []} />
      </Suspense>
    </div>
  );
};

export default MyToursListingPage;
