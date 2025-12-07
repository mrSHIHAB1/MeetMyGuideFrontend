"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteTourist } from "@/services/admin/touristsManagement";
import { ITourist } from "@/types/tourist.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import TouristFormDialog from "./TouristFormDialog";
import { touristsColumns } from "./touristsColumn";
import TouristViewDetailDialog from "./TouristViewDetailDialog";

interface TouristsTableProps {
    tourists: ITourist[];
}

const TouristsTable = ({ tourists }: TouristsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingTourist, setDeletingTourist] = useState<ITourist | null>(null);
    const [viewingTourist, setViewingTourist] = useState<ITourist | null>(null);
    const [editingTourist, setEditingTourist] = useState<ITourist | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (tourist: ITourist) => {
        setViewingTourist(tourist);
    };

    const handleEdit = (tourist: ITourist) => {
        setEditingTourist(tourist);
    };

    const handleDelete = (tourist: ITourist) => {
        setDeletingTourist(tourist);
    };

    const confirmDelete = async () => {
        if (!deletingTourist) return;

        setIsDeleting(true);
        // Use _id if available, fallback to id
        const touristId = deletingTourist._id || deletingTourist.id;
        if (!touristId) {
            toast.error("Tourist ID not found");
            setIsDeleting(false);
            return;
        }

        const result = await softDeleteTourist(touristId);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Tourist deleted successfully");
            setDeletingTourist(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete tourist");
        }
    };

    return (
        <>
            <ManagementTable
                data={tourists}
                columns={touristsColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(tourist) => tourist._id || tourist.id!}
                emptyMessage="No tourists found"
            />

            {/* Edit Tourist Form Dialog */}
            <TouristFormDialog
                open={!!editingTourist}
                onClose={() => setEditingTourist(null)}
                tourist={editingTourist!}
                onSuccess={() => {
                    setEditingTourist(null);
                    handleRefresh();
                }}
            />

            {/* View Tourist Detail Dialog */}
            <TouristViewDetailDialog
                open={!!viewingTourist}
                onClose={() => setViewingTourist(null)}
                tourist={viewingTourist}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingTourist}
                onOpenChange={(open) => !open && setDeletingTourist(null)}
                onConfirm={confirmDelete}
                title="Delete Tourist"
                description={`Are you sure you want to delete ${deletingTourist?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default TouristsTable;
