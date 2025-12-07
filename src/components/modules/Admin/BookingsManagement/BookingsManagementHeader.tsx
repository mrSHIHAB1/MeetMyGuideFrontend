"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Calendar } from "lucide-react";

const BookingsManagementHeader = () => {
    return (
        <ManagementPageHeader
            title="Bookings Management"
            description="View and manage all tour bookings"
            action={{
                label: "Export Bookings",
                icon: Calendar,
                onClick: () => {
                    // TODO: Implement export functionality
                    console.log("Export bookings");
                },
            }}
        />
    );
};

export default BookingsManagementHeader;
