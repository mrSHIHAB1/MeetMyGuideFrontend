import InfoRow from "@/components/shared/InoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { IBooking, BookingStatus } from "@/types/booking.interface";
import { Calendar, Mail, Phone, Users, MapPin, MessageSquare } from "lucide-react";

interface IBookingViewDialogProps {
    open: boolean;
    onClose: () => void;
    booking: IBooking | null;
}

const getStatusBadge = (status: BookingStatus) => {
    const variants: Record<BookingStatus, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
        [BookingStatus.PENDING]: { variant: "secondary", label: "Pending" },
        [BookingStatus.CONFIRMED]: { variant: "default", label: "Confirmed" },
        [BookingStatus.COMPLETED]: { variant: "outline", label: "Completed" },
        [BookingStatus.CANCELLED]: { variant: "destructive", label: "Cancelled" },
    };

    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
};

const BookingViewDetailDialog = ({
    open,
    onClose,
    booking,
}: IBookingViewDialogProps) => {
    if (!booking) {
        return null;
    }

    const tourist = typeof booking.tourist === 'object' ? booking.tourist : null;
    const guide = typeof booking.guide === 'object' ? booking.guide : null;
    const tour = typeof booking.tour === 'object' ? booking.tour : null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Booking Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Booking Header */}
                    <div className="p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">{tour?.title || 'Tour'}</h2>
                                <p className="text-muted-foreground">Booking ID: {booking._id || booking.id}</p>
                            </div>
                            {getStatusBadge(booking.status)}
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="space-y-6">
                        {/* Tourist Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Tourist Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Name" value={tourist?.name || "N/A"} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Email" value={tourist?.email || "N/A"} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Phone" value={tourist?.phone || "Not provided"} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Guide Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg">Guide Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Name" value={guide?.name || "N/A"} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Email" value={guide?.email || "N/A"} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Phone" value={guide?.phone || "Not provided"} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Booking Details */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg">Booking Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Requested Date"
                                        value={new Date(booking.requestedDate).toLocaleDateString()}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Requested Time"
                                        value={booking.requestedTime || "Not specified"}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Number of People"
                                        value={booking.numberOfPeople?.toString() || "1"}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Created On"
                                        value={formatDateTime(booking.createdAt || "")}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Special Requests */}
                        {booking.specialRequests && (
                            <>
                                <Separator />
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <MessageSquare className="h-5 w-5 text-orange-600" />
                                        <h3 className="font-semibold text-lg">Special Requests</h3>
                                    </div>
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <p className="text-sm">{booking.specialRequests}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingViewDetailDialog;
