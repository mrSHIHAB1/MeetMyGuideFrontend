"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const TourFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category && category !== "ALL") {
            params.set("category", category);
            params.set("page", "1");
        } else {
            params.delete("category");
            params.delete("page");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className="space-y-3">
            {/* Row 1: Search and Refresh */}
            <div className="flex items-center gap-3">
                <SearchFilter paramName="destination" placeholder="Search destination..." />
                
            </div>

            {/* Row 2: Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Category Filter */}
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    value={searchParams.get("category") || "ALL"}
                    disabled={isPending}
                >
                    <option value="ALL">All Categories</option>
                    <option value="FOOD">Food</option>
                    <option value="ART">Art</option>
                    <option value="ADVENTURE">Adventure</option>
                    <option value="CULTURE">Culture</option>
                    <option value="NATURE">Nature</option>
                    <option value="HISTORY">History</option>
                    <option value="SHOPPING">Shopping</option>
                    <option value="NIGHTLIFE">Nightlife</option>
                </select>

                {/* Min Price Filter */}
                <SearchFilter paramName="minPrice" placeholder="Min Price" />

                {/* Max Price Filter */}
                <SearchFilter paramName="maxPrice" placeholder="Max Price" />

                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default TourFilter;
