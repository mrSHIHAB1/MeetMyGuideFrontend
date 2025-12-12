"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import TouristFormDialog from "./TouristFormDialog";
import ViewAllEmailsDialog from "./ViewAllEmailsDialog";
import { getTourists } from "@/services/admin/touristsManagement";
import { Button } from "@/components/ui/button";

const TouristsManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const [loadingEmails, setLoadingEmails] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };



    //force remount to reset state of form
    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <TouristFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

          
            <ManagementPageHeader
                title="Tourists Management"
                description="Manage tourist accounts and profiles"
                action={{
                    label: "Add Tourist",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
              
            />
        </>
    );
};

export default TouristsManagementHeader;
