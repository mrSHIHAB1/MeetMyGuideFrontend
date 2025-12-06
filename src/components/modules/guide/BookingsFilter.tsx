"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import RefreshButton from "@/components/shared/RefreshButton";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";

const BookingsFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (status: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (status && status !== "ALL") {
            params.set("status", status);
        } else {
            params.delete("status");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className="space-y-3">
            {/* Row 1: Status Filter and Refresh */}
            <div className="flex items-center gap-3">
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => handleStatusChange(e.target.value)}
                    value={searchParams.get("status") || "ALL"}
                    disabled={isPending}
                >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>

                <RefreshButton />
                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default BookingsFilter;
