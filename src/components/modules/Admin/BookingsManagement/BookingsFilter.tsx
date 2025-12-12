"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const BookingsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete("status");
        } else {
            params.set("status", value);
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="space-y-3">
            {/* Row 1: Search and Refresh */}
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search bookings..." />
              
            </div>

            {/* Row 2: Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Status Filter */}
                <Select
                    value={searchParams.get("status") || "all"}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>

          
            </div>
        </div>
    );
};

export default BookingsFilter;
