"use client";

interface Booking {
    _id: string;
    tourist: any;
    tour: any;
    requestedDate: string;
    requestedTime?: string;
    status: string;
    numberOfPeople?: number;
    specialRequests?: string;
}

interface BookingsTableProps {
    bookings: Booking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            PENDING: "badge-warning",
            CONFIRMED: "badge-info",
            COMPLETED: "badge-success",
            CANCELLED: "badge-error",
        };
        return badges[status] || "badge-ghost";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-500">No bookings found</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>Tourist</th>
                        <th>Tour</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>People</th>
                        <th>Status</th>
                        <th>Special Requests</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>
                                <div className="font-medium">
                                    {booking.tourist?.name || "N/A"}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {booking.tourist?.email || ""}
                                </div>
                            </td>
                            <td>
                                <div className="font-medium">
                                    {booking.tour?.title || "N/A"}
                                </div>
                                <div className="text-sm text-gray-500">
                                    ${booking.tour?.fee || 0}
                                </div>
                            </td>
                            <td>{formatDate(booking.requestedDate)}</td>
                            <td>{booking.requestedTime || "N/A"}</td>
                            <td>{booking.numberOfPeople || 1}</td>
                            <td>
                                <span className={`badge ${getStatusBadge(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="max-w-xs truncate">
                                {booking.specialRequests || "None"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingsTable;
