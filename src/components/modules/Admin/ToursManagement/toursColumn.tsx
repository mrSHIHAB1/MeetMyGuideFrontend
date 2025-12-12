"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITour, TourStatus, TourCategory } from "@/types/tour.interface";
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status?: TourStatus) => {
    if (status === TourStatus.ACTIVE) {
        return <Badge variant="default">Active</Badge>;
    }
    return <Badge variant="secondary">Inactive</Badge>;
};

const getCategoryBadge = (category?: TourCategory) => {
    if (!category) return <span className="text-sm text-muted-foreground">N/A</span>;

    const colors: Record<TourCategory, string> = {
        [TourCategory.FOOD]: "bg-orange-100 text-orange-800",
        [TourCategory.ART]: "bg-purple-100 text-purple-800",
        [TourCategory.ADVENTURE]: "bg-green-100 text-green-800",
        [TourCategory.CULTURE]: "bg-blue-100 text-blue-800",
        [TourCategory.NATURE]: "bg-emerald-100 text-emerald-800",
        [TourCategory.HISTORY]: "bg-amber-100 text-amber-800",
        [TourCategory.SHOPPING]: "bg-pink-100 text-pink-800",
        [TourCategory.NIGHTLIFE]: "bg-indigo-100 text-indigo-800",
        [TourCategory.ALL]: "bg-gray-100 text-gray-800",
    };

    return (
        <Badge className={colors[category]} variant="outline">
            {category}
        </Badge>
    );
};

export const toursColumns: Column<ITour>[] = [
    {
        header: "Tour",
        accessor: (tour) => (
            <div className="flex flex-col">
                <span className="font-medium">{tour.title}</span>
                <span className="text-xs text-muted-foreground">{tour.destination}</span>
            </div>
        ),
        sortKey: "title",
    },
    {
        header: "Category",
        accessor: (tour) => getCategoryBadge(tour.category),
    },
    {
        header: "Fee",
        accessor: (tour) => (
            <span className="font-medium">${tour.fee}</span>
        ),
    },
 
    {
        header: "Status",
        accessor: (tour) => getStatusBadge(tour.status),
    },
    {
        header: "Created",
        accessor: (tour) => <DateCell date={tour.createdAt?.toString()} />,
        sortKey: "createdAt",
    },
];
