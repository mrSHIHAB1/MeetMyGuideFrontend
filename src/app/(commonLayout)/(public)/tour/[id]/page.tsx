import TourDetailsPage from "@/components/TourDetailsCard";

import { getGuideById } from "@/services/admin/guideManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTourById } from "@/services/guide/tourMangement";
import { getTouristById } from "@/services/tourist/touristManagement";

interface Props {
  params: { id: string };
}

export default async function TourPage({ params }: Props) {
  const { id } = await params;

  const tourResponse = await getTourById(id);
  const tour = tourResponse.data;
  const current=await getUserInfo();
  const user=await getTouristById(current.id)
const wishlist=user.data.wishlist
  const guide = tour.guide ? await getGuideById(tour.guide) : undefined;
console.log("wishlist",wishlist)
  return (
    <div className="p-6">
      <TourDetailsPage tour={tour} guideinfo={guide?.data} wishlist={wishlist} />
    </div>
  );
}
