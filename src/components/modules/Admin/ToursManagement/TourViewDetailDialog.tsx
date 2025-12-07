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
import { ITour, TourStatus, TourCategory } from "@/types/tour.interface";
import { Calendar, MapPin, Users, DollarSign, Clock, Image as ImageIcon } from "lucide-react";

interface ITourViewDialogProps {
    open: boolean;
    onClose: () => void;
    tour: ITour | null;
}

const getStatusBadge = (status?: TourStatus) => {
    if (status === TourStatus.ACTIVE) {
        return <Badge variant="default">Active</Badge>;
    }
    return <Badge variant="secondary">Inactive</Badge>;
};

const TourViewDetailDialog = ({
    open,
    onClose,
    tour,
}: ITourViewDialogProps) => {
    if (!tour) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Tour Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Tour Header */}
                    <div className="p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-1">{tour.title}</h2>
                                <p className="text-muted-foreground mb-2 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {tour.destination || 'No destination'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {getStatusBadge(tour.status)}
                                {tour.category && (
                                    <Badge variant="outline">{tour.category}</Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Tour Images */}
                    {tour.images && tour.images.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ImageIcon className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg">Images</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {tour.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`Tour ${idx + 1}`}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {tour.description && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2">Description</h3>
                            <p className="text-sm text-muted-foreground">{tour.description}</p>
                        </div>
                    )}

                    {/* Itinerary */}
                    {tour.itinerary && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg mb-2">Itinerary</h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{tour.itinerary}</p>
                        </div>
                    )}

                    <Separator className="my-6" />

                    {/* Tour Details Grid */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg">Pricing & Duration</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Fee" value={`$${tour.fee}`} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Duration" value={`${tour.duration} hours`} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Location & Group</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Meeting Point" value={tour.meetingPoint || "Not specified"} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Max Group Size" value={tour.maxGroupSize?.toString() || "Unlimited"} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-orange-600" />
                                <h3 className="font-semibold text-lg">Metadata</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Created On"
                                        value={formatDateTime(tour.createdAt?.toString() || "")}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Last Updated"
                                        value={formatDateTime(tour.updatedAt?.toString() || "")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TourViewDetailDialog;
