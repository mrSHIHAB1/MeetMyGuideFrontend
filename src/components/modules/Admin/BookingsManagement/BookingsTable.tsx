"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteBooking, updateBookingStatus } from "@/services/admin/bookingsManagement";
import { IBooking, BookingStatus } from "@/types/booking.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { bookingsColumns } from "./bookingsColumn";
import BookingViewDetailDialog from "./BookingViewDetailDialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";

interface BookingsTableProps {
    bookings: IBooking[];
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingBooking, setDeletingBooking] = useState<IBooking | null>(null);
    const [viewingBooking, setViewingBooking] = useState<IBooking | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (booking: IBooking) => {
        setViewingBooking(booking);
    };

    const handleDelete = (booking: IBooking) => {
        setDeletingBooking(booking);
    };

    const confirmDelete = async () => {
        if (!deletingBooking) return;

        setIsDeleting(true);
        const bookingId = deletingBooking._id || deletingBooking.id;
        if (!bookingId) {
            toast.error("Booking ID not found");
            setIsDeleting(false);
            return;
        }

        const result = await deleteBooking(bookingId);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Booking deleted successfully");
            setDeletingBooking(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete booking");
        }
    };

    const handleStatusUpdate = async (booking: IBooking, action: 'accept' | 'decline' | 'complete') => {
        const bookingId = booking._id || booking.id;
        if (!bookingId) {
            toast.error("Booking ID not found");
            return;
        }

        setIsUpdating(true);
        const result = await updateBookingStatus(bookingId, action);
        setIsUpdating(false);

        if (result.success) {
            toast.success(result.message || `Booking ${action}ed successfully`);
            handleRefresh();
        } else {
            toast.error(result.message || `Failed to ${action} booking`);
        }
    };

    // Custom actions for each booking
    const renderActions = (booking: IBooking) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" disabled={isUpdating}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {booking.status === BookingStatus.PENDING && (
                    <>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking, 'accept')}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            Accept Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking, 'decline')}>
                            <XCircle className="mr-2 h-4 w-4 text-red-600" />
                            Decline Booking
                        </DropdownMenuItem>
                    </>
                )}
                {booking.status === BookingStatus.CONFIRMED && (
                    <DropdownMenuItem onClick={() => handleStatusUpdate(booking, 'complete')}>
                        <Clock className="mr-2 h-4 w-4 text-blue-600" />
                        Mark as Completed
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            <ManagementTable
                data={bookings}
                columns={bookingsColumns}
                onView={handleView}
                onDelete={handleDelete}
                getRowKey={(booking) => booking._id || booking.id!}
                emptyMessage="No bookings found"
                customActions={renderActions}
            />

            {/* View Booking Detail Dialog */}
            <BookingViewDetailDialog
                open={!!viewingBooking}
                onClose={() => setViewingBooking(null)}
                booking={viewingBooking}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingBooking}
                onOpenChange={(open) => !open && setDeletingBooking(null)}
                onConfirm={confirmDelete}
                title="Delete Booking"
                description={`Are you sure you want to delete this booking? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default BookingsTable;
