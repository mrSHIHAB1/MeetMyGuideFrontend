"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteTour } from "@/services/admin/toursManagement";
import { ITour } from "@/types/tour.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition, useCallback } from "react";
import { toast } from "sonner";
import { toursColumns } from "./toursColumn";
import TourViewDetailDialog from "./TourViewDetailDialog";
import TourFormDialog from "./TourFormDialog";

interface ToursTableProps {
    tours: ITour[];
}

const ToursTable = ({ tours }: ToursTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingTour, setDeletingTour] = useState<ITour | null>(null);
    const [viewingTour, setViewingTour] = useState<ITour | null>(null);
    const [editingTour, setEditingTour] = useState<ITour | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = useCallback(() => {
        startTransition(() => {
            router.refresh();
        });
    }, [router]);

    const handleView = (tour: ITour) => {
        setViewingTour(tour);
    };

    const handleEdit = (tour: ITour) => {
        setEditingTour(tour);
    };

    const handleDelete = (tour: ITour) => {
        setDeletingTour(tour);
    };

    const confirmDelete = async () => {
        if (!deletingTour) return;

        setIsDeleting(true);
        const tourId = deletingTour._id;
        if (!tourId) {
            toast.error("Tour ID not found");
            setIsDeleting(false);
            return;
        }

        const result = await deleteTour(tourId);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Tour deleted successfully");
            setDeletingTour(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete tour");
        }
    };

    const handleEditClose = useCallback(() => {
        setEditingTour(null);
    }, []);

    const handleEditSuccess = useCallback(() => {
        setEditingTour(null);
        handleRefresh();
    }, [handleRefresh]);

    return (
        <>
            <ManagementTable
                data={tours}
                columns={toursColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(tour) => tour._id!}
                emptyMessage="No tours found"
            />

            {/* View Tour Detail Dialog */}
            <TourViewDetailDialog
                open={!!viewingTour}
                onClose={() => setViewingTour(null)}
                tour={viewingTour}
            />

            {/* Edit Tour Form Dialog */}
            <TourFormDialog
                open={!!editingTour}
                onClose={handleEditClose}
                tour={editingTour!}
                onSuccess={handleEditSuccess}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingTour}
                onOpenChange={(open) => !open && setDeletingTour(null)}
                onConfirm={confirmDelete}
                title="Delete Tour"
                description={`Are you sure you want to delete "${deletingTour?.title}"? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default ToursTable;
