"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { softDeleteGuide } from "@/services/admin/guidesManagement";
import { IGuide } from "@/types/guide.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import GuideFormDialog from "./GuideFormDialog";
import { guidesColumns } from "./guidesColumn";
import GuideViewDetailDialog from "./GuideViewDetailDialog";

interface GuidesTableProps {
    guides: IGuide[];
}

const GuidesTable = ({ guides }: GuidesTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingGuide, setDeletingGuide] = useState<IGuide | null>(null);
    const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);
    const [editingGuide, setEditingGuide] = useState<IGuide | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (guide: IGuide) => {
        setViewingGuide(guide);
    };

    const handleEdit = (guide: IGuide) => {
        setEditingGuide(guide);
    };

    const handleDelete = (guide: IGuide) => {
        setDeletingGuide(guide);
    };

    const confirmDelete = async () => {
        if (!deletingGuide) return;

        setIsDeleting(true);
        // Use _id if available, fallback to id
        const guideId = deletingGuide._id || deletingGuide.id;
        if (!guideId) {
            toast.error("Guide ID not found");
            setIsDeleting(false);
            return;
        }

        const result = await softDeleteGuide(guideId);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Guide deleted successfully");
            setDeletingGuide(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete guide");
        }
    };

    return (
        <>
            <ManagementTable
                data={guides}
                columns={guidesColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(guide) => guide._id || guide.id!}
                emptyMessage="No guides found"
            />

            {/* Edit Guide Form Dialog */}
            <GuideFormDialog
                open={!!editingGuide}
                onClose={() => setEditingGuide(null)}
                guide={editingGuide!}
                onSuccess={() => {
                    setEditingGuide(null);
                    handleRefresh();
                }}
            />

            {/* View Guide Detail Dialog */}
            <GuideViewDetailDialog
                open={!!viewingGuide}
                onClose={() => setViewingGuide(null)}
                guide={viewingGuide}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingGuide}
                onOpenChange={(open) => !open && setDeletingGuide(null)}
                onConfirm={confirmDelete}
                title="Delete Guide"
                description={`Are you sure you want to delete ${deletingGuide?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default GuidesTable;
