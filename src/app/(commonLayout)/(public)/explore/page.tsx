import { TourCard } from "@/components/TourCard";
import { getTours } from "@/services/admin/toursManagement";
import Link from "next/link";

export default async function Explore() {
    const toursResponse = await getTours();
    const tours = toursResponse.data || [];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tours.map((tour: any) => (
      <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    );
  }
  