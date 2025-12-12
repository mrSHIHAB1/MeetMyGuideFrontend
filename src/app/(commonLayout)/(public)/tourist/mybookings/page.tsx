import { BookingCard } from "@/components/modules/tourist/TourCard/BookingCard";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTourById, getTouristById } from "@/services/tourist/touristManagement";
import { getAllTour } from "@/services/tourist/toursManagement";

const BookingDashboard = async () => {

    // 🔹 Get user
    const userResult = await getUserInfo();
    const userinfo = await getTouristById(userResult.id);
    const user = userinfo.data || null;

    // 🔹 Get all bookings for this user
    const bookingsResult = await getAllTour();
    const bookings = bookingsResult?.data || [];

    // 🔹 Create new variable where booking + tour info is stored together
    const mergedData = await Promise.all(
        bookings.map(async (booking: any) => {
            const tourRes = await getTourById(booking.tour._id);
            const tour = tourRes?.data || {};
            const isBookmarked = user?.wishlist?.includes(tour._id);
            return {
                bookingId: booking._id,
                bookingStatus: booking.status,
                paymentStatus: booking.paymentStatus,
                requestedDate: booking.requestedDate,

                // tour info
                tourId: tour._id,
                title: tour.title,
                destination: tour.destination,
                fee: tour.fee,
                images: tour.images,
                duration: tour.duration,
                category: tour.category,
                meetingPoint: tour.meetingPoint,
                itinerary: tour.itinerary,
                tourStatus: tour.status,
                //userwishlist

                isBookmarked,
            };
        })
    );

    // Pass clean merged data
    return <BookingCard data={mergedData} user={user} />;
};

export default BookingDashboard;
