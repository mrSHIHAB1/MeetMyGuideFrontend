import { BookingCard } from "@/components/modules/tourist/TourCard/BookingCard";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllTour } from "@/services/tourist/toursManagement";

const BookingDashboard = async () => {
    const toursResult = await getAllTour();
    const userResult = await getUserInfo();

    const tours = toursResult?.data || [];
    const user = userResult || null;

    return <BookingCard tours={tours} user={user} />;
};

export default BookingDashboard;
