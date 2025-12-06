"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import RefreshButton from "@/components/shared/RefreshButton";

const PendingRequestsFilter = () => {
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
            router.refresh(); // Force server component to re-render
        });
    };

    return (
        <div className="flex items-center gap-3">
            <select
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => handleStatusChange(e.target.value)}
                value={searchParams.get("status") || "ALL"}
                disabled={isPending}
            >
                <option value="ALL">All (Pending & Cancelled)</option>
                <option value="PENDING">Pending Only</option>
                <option value="CANCELLED">Cancelled Only</option>
            </select>

            <RefreshButton />
        </div>
    );
};

export default PendingRequestsFilter;

