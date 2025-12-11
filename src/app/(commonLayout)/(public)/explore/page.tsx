import { TourCard } from "@/components/TourCard";
import { getAllToursByFilter } from "@/services/guide/tourMangement";
import { getExploreAllTour } from "@/services/tourist/toursManagement";
import Image from "next/image";
import { MapPin, Mail, Users } from "lucide-react";
export default async function Explore({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const toursResponse = await getExploreAllTour();
  // const tours = toursResponse.data || [];
  const searchParamsObj = await searchParams;

  // Build filter object from search params
  const filters = {
    destination: searchParamsObj.destination as string | undefined,
    category: searchParamsObj.category as string | undefined,
    minPrice: searchParamsObj.minPrice ? Number(searchParamsObj.minPrice) : undefined,
    maxPrice: searchParamsObj.maxPrice ? Number(searchParamsObj.maxPrice) : undefined,
  };

  const tours = await getAllToursByFilter(filters);
  return (
    <> <div className="relative w-full h-[300px]">
      <Image
        src="/Section.png"
        alt="Logo"
        fill
        className="object-cover"
      />

    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tours.data.map((tour: any) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </>
  );
}
