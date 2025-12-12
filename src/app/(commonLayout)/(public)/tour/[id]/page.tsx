import TourDetailsPage from "@/components/TourDetailsCard";

import { getGuideById } from "@/services/admin/guideManagement";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { fetchGuideReviews } from "@/services/guide/guideBookingsManagement";
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
  const { avgRating, count } = await fetchGuideReviews(guide.data._id);

  return (
    <div className="p-6">
      <TourDetailsPage tour={tour} guideinfo={guide?.data} wishlist={wishlist} avgrating={avgRating} reviewCount={count} />
    </div>
  );
}
