// app/(commonLayout)/(public)/guideDetails/[id]/page.tsx


import GuideProfile from "@/components/modules/guide/GuideProfile";
import { getGuideById } from "@/services/admin/guideManagement";
import { fetchGuideReviews } from "@/services/guide/guideBookingsManagement";
import { guideToursByGuideId } from "@/services/guide/tourMangement";

interface Props {
  params: { id: string };
}

export default async function GuideDetails({ params }: Props) {
  const { id } = await params;

  const guidedata = await getGuideById(id);
  const tourResponse = await guideToursByGuideId(id);
  const review = await fetchGuideReviews(id);

  const tours = Array.isArray(tourResponse)
    ? tourResponse
    : tourResponse?.data || [];

  return (
    <GuideProfile guidedata={guidedata} tours={tours} review={review} />
  );
}
