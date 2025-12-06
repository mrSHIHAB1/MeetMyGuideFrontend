import TourDetailsPage from "@/components/TourDetailsCard";

import { getGuideById } from "@/services/admin/guideManagement";
import { getTourById } from "@/services/guide/tourMangement";

interface Props {
  params: { id: string };
}

export default async function TourPage({ params }: Props) {
  const { id } = await params;

  const tourResponse = await getTourById(id);
  const tour = tourResponse.data;

  const guide = tour.guide ? await getGuideById(tour.guide) : undefined;

  return (
    <div className="p-6">
      <TourDetailsPage tour={tour} guideinfo={guide.data} />
    </div>
  );
}
