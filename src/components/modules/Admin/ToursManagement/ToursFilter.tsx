"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { TourCategory, TourStatus } from "@/types/tour.interface";

const ToursFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete("category");
        } else {
            params.set("category", value);
        }
        router.push(`?${params.toString()}`);
    };

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
                <SearchFilter paramName="searchTerm" placeholder="Search tours..." />
             
            </div>

            {/* Row 2: Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Category Filter */}
                <Select
                    value={searchParams.get("category") || "all"}
                    onValueChange={handleCategoryChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {Object.values(TourCategory).filter(c => c !== TourCategory.ALL).map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select
                    value={searchParams.get("status") || "all"}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value={TourStatus.ACTIVE}>Active</SelectItem>
                        <SelectItem value={TourStatus.INACTIVE}>Inactive</SelectItem>
                    </SelectContent>
                </Select>

                {/* Destination Filter */}
                <SearchFilter paramName="destination" placeholder="Destination" />

                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default ToursFilter;
