import { BookingCard } from "@/components/modules/tourist/TourCard/BookingCard";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTourById, getTouristById } from "@/services/tourist/touristManagement";
import { getAllTour } from "@/services/tourist/toursManagement";

const BookingDashboard = async () => {

    const userResult = await getUserInfo();
    const userinfo = await getTouristById(userResult.id);
    const user = userinfo.data || null;


    const bookingsResult = await getAllTour();
    const bookings = bookingsResult?.data || [];


    const mergedBookings = await Promise.all(
        bookings.map(async (booking: any) => {
            const tourRes = await getTourById(booking.tour?._id);
            const tour = tourRes?.data || {};

            return {
                bookingId: booking._id,
                bookingStatus: booking.status || "PENDING",
                paymentStatus: booking.paymentStatus || "UNPAID",
                requestedDate: booking.requestedDate || "N/A",


                tourId: tour._id || "",
                title: tour.title || "Untitled Tour",
                destination: tour.destination || "Unknown",
                fee: tour.fee || 0,
                images: tour.images?.length ? tour.images : ["/no-image.jpg"],
                duration: tour.duration || "N/A",
                category: tour.category || "General",
                meetingPoint: tour.meetingPoint || "TBD",
                itinerary: tour.itinerary || [],
                tourStatus: tour.status || "UPCOMING",


                isBookmarked: user?.wishlist?.includes(tour._id) || false,
            };
        })
    );


    const wishlistTours = await Promise.all(
        (user?.wishlist || []).map(async (tourId: string) => {
            const tourRes = await getTourById(tourId);
            const tour = tourRes?.data;
            if (!tour) return null;

            return {
                bookingId: null,
                bookingStatus: "WISHLIST",
                paymentStatus: null,
                requestedDate: null,
                tourId: tour._id,
                title: tour.title,
                destination: tour.destination,
                fee: tour.fee,
                images: tour.images?.length ? tour.images : ["/no-image.jpg"],
                duration: tour.duration,
                category: tour.category,
                meetingPoint: tour.meetingPoint,
                itinerary: tour.itinerary,
                tourStatus: tour.status,
                isBookmarked: true,
            };
        })
    );


    const mergedData = [...mergedBookings, ...wishlistTours.filter(Boolean)];

    return <BookingCard data={mergedData} user={user} />;
};

export default BookingDashboard;