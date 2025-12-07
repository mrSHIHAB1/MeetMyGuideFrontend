"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import TourFormDialog from "./TourFormDialog";

const ToursManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = useCallback(() => {
        startTransition(() => {
            router.refresh();
        });
    }, [router]);

    const handleClose = useCallback(() => {
        setIsDialogOpen(false);
    }, []);

    return (
        <>
            <TourFormDialog
                open={isDialogOpen}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Tours Management"
                description="Manage all tours and experiences"
                action={{
                    label: "Add Tour",
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
};

export default ToursManagementHeader;
