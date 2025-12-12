import BookDetailsPage from "@/components/BookDetailsPage";
import TourDetailsPage from "@/components/TourDetailsCard";

import { getGuideById } from "@/services/admin/guideManagement";
import { fetchGuideReviews } from "@/services/guide/guideBookingsManagement";
import { getTourById } from "@/services/guide/tourMangement";
import { getBookingById } from "@/services/tourist/toursManagement";

interface Props {
    params: { id: string };
}

export default async function BookPage({ params }: Props) {
    const { id } = await params;

    const booking = await getBookingById(id);
    const tourResponse = await getTourById(booking.data.tour._id);
    const tour = tourResponse.data;

    const guide = booking.data.guide._id ? await getGuideById(booking.data.guide._id) : undefined;
    const { avgRating, count } = await fetchGuideReviews(guide.data._id);
console.log(avgRating)
    return (
        <div className="p-6">
            <BookDetailsPage tour={tour} guideinfo={guide?.data} booking={booking.data} avgrating={avgRating} reviewCount={count} />
        </div>
    );
}
