"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { acceptBooking, declineBooking } from "@/services/guide/guideBookingsManagement";

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

interface PendingBookingsTableProps {
    bookings: Booking[];
}

const PendingBookingsTable = ({ bookings: initialBookings }: PendingBookingsTableProps) => {
    const router = useRouter();
    const [bookings, setBookings] = useState(initialBookings);
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const getStatusBadge = (status: string) => {
        const badges: Record<string, string> = {
            PENDING: "badge-warning",
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

    const handleAccept = async (bookingId: string) => {
        setLoadingStates((prev) => ({ ...prev, [bookingId]: true }));

        try {
            const result = await acceptBooking(bookingId);

            if (result.success) {
                toast.success("Booking confirmed successfully!");
                // Update local state
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === bookingId
                            ? { ...booking, status: "CONFIRMED" }
                            : booking
                    )
                );
                // Refresh the page to get updated data
                router.refresh();
            } else {
                toast.error(result.message || "Failed to confirm booking");
            }
        } catch (error) {
            toast.error("An error occurred while confirming the booking");
        } finally {
            setLoadingStates((prev) => ({ ...prev, [bookingId]: false }));
        }
    };

    const handleDecline = async (bookingId: string) => {
        setLoadingStates((prev) => ({ ...prev, [bookingId]: true }));

        try {
            const result = await declineBooking(bookingId);

            if (result.success) {
                toast.success("Booking declined successfully!");
                // Update local state
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking._id === bookingId
                            ? { ...booking, status: "CANCELLED" }
                            : booking
                    )
                );
                // Refresh the page to get updated data
                router.refresh();
            } else {
                toast.error(result.message || "Failed to decline booking");
            }
        } catch (error) {
            toast.error("An error occurred while declining the booking");
        } finally {
            setLoadingStates((prev) => ({ ...prev, [bookingId]: false }));
        }
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-500">No pending or cancelled bookings found</p>
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
                        <th>Actions</th>
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
                            <td>
                                {booking.status === "PENDING" ? (
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleAccept(booking._id)}
                                            disabled={loadingStates[booking._id]}
                                        >
                                            {loadingStates[booking._id] ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                "Accept"
                                            )}
                                        </button>
                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDecline(booking._id)}
                                            disabled={loadingStates[booking._id]}
                                        >
                                            {loadingStates[booking._id] ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                "Decline"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-sm text-gray-500">No actions</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingBookingsTable;
