"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { IBooking, BookingStatus } from "@/types/booking.interface";
import { Badge } from "@/components/ui/badge";

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

export const bookingsColumns: Column<IBooking>[] = [
    {
        header: "Tourist",
        accessor: (booking) => {
            const tourist = typeof booking.tourist === 'object' ? booking.tourist : null;
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{tourist?.name || 'N/A'}</span>
                    <span className="text-xs text-muted-foreground">{tourist?.email || ''}</span>
                </div>
            );
        },
    },
    {
        header: "Tour",
        accessor: (booking) => {
            const tour = typeof booking.tour === 'object' ? booking.tour : null;
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{tour?.title || 'N/A'}</span>
                </div>
            );
        },
    },
    {
        header: "Guide",
        accessor: (booking) => {
            const guide = typeof booking.guide === 'object' ? booking.guide : null;
            return (
                <div className="flex flex-col">
                    <span className="text-sm">{guide?.name || 'N/A'}</span>
                </div>
            );
        },
    },


    {
        header: "Status",
        accessor: (booking) => getStatusBadge(booking.status),
    },
    {
        header: "Created",
        accessor: (booking) => <DateCell date={booking.createdAt} />,
        sortKey: "createdAt",
    },
];
