import { TourCard } from "@/components/TourCard";
import { getAllToursByFilter } from "@/services/guide/tourMangement";
import Image from "next/image";
import { Suspense } from "react";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Or use this if you want to allow static generation but opt-out of prerendering
// export const dynamicParams = true;

async function ExploreContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters = {
    destination: searchParams.destination as string | undefined,
    category: searchParams.category as string | undefined,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
  };

  const toursResponse = await getAllToursByFilter(filters);
  const tours = toursResponse?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tours.length > 0 ? (
        tours.map((tour: any) => (
          
          <TourCard key={tour._id} tour={tour} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No tours found matching your filters.
        </p>
      )}
    </div>
  );
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;

  return (
    <div className="space-y-6">
      <div className="relative w-full h-[300px]">
        <Image
          src="/Section.png"
          alt="Explore Tours Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold tracking-tight px-6">Explore Tours</h1>
      <p className="text-muted-foreground px-6">
        Discover tours based on your preferences
      </p>

      <Suspense fallback={<div className="p-6">Loading tours...</div>}>
        <ExploreContent searchParams={searchParamsObj} />
      </Suspense>
    </div>
  );
}