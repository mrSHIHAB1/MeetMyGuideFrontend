"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import { IBooking, BookingStatus } from "@/types/booking.interface";
import { updateBookingAdmin } from "@/services/admin/bookingsManagement";
import { useState } from "react";
import { toast } from "sonner";

interface BookingUpdateDialogProps {
    open: boolean;
    onClose: () => void;
    booking: IBooking | null;
}

const BookingUpdateDialog = ({ open, onClose, booking }: BookingUpdateDialogProps) => {
    if (!booking) return null;

    const bookingId = booking._id || booking.id;

    const [status, setStatus] = useState<BookingStatus>(booking.status);
    const [requestedDate, setRequestedDate] = useState(
        booking.requestedDate ? booking.requestedDate.split("T")[0] : ""
    );
    const [requestedTime, setRequestedTime] = useState(booking.requestedTime || "");
    const [numberOfPeople, setNumberOfPeople] = useState(
        booking.numberOfPeople?.toString() || "1"
    );
    const [specialRequests, setSpecialRequests] = useState(
        booking.specialRequests || ""
    );

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!bookingId) {
            toast.error("Booking ID missing");
            return;
        }

        const payload = {
            status,
            requestedDate,
            requestedTime,
            numberOfPeople: Number(numberOfPeople),
            specialRequests,
        };

        setLoading(true);
        const result = await updateBookingAdmin(bookingId, payload);
        setLoading(false);

        if (result.success) {
            toast.success("Booking updated successfully");
            onClose();
        } else {
            toast.error(result.message || "Update failed");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Update Booking</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">

                    {/* Status */}
                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select
                            defaultValue={status}
                            onValueChange={(v: BookingStatus) => setStatus(v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={BookingStatus.PENDING}>Pending</SelectItem>
                                <SelectItem value={BookingStatus.CONFIRMED}>Confirmed</SelectItem>
                                <SelectItem value={BookingStatus.COMPLETED}>Completed</SelectItem>
                                <SelectItem value={BookingStatus.CANCELLED}>Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Requested Date */}
                    <div className="grid gap-2">
                        <Label>Requested Date</Label>
                        <Input
                            type="date"
                            value={requestedDate}
                            onChange={(e) => setRequestedDate(e.target.value)}
                        />
                    </div>

                    {/* Requested Time */}
                    <div className="grid gap-2">
                        <Label>Requested Time</Label>
                        <Input
                            type="time"
                            value={requestedTime}
                            onChange={(e) => setRequestedTime(e.target.value)}
                        />
                    </div>

                    {/* Number of People */}
                    <div className="grid gap-2">
                        <Label>Number of People</Label>
                        <Input
                            type="number"
                            min={1}
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                        />
                    </div>

                    {/* Special Requests */}
                    <div className="grid gap-2">
                        <Label>Special Requests</Label>
                        <Textarea
                            rows={3}
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingUpdateDialog;
