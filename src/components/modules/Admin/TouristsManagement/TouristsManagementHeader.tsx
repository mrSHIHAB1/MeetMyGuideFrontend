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
    const [isEmailsDialogOpen, setIsEmailsDialogOpen] = useState(false);
    const [touristEmails, setTouristEmails] = useState<string[]>([]);
    const [loadingEmails, setLoadingEmails] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleViewAllEmails = async () => {
        setLoadingEmails(true);
        try {
            // Fetch all tourists with role filter
            const result = await getTourists("role=TOURIST");
            if (result.success && result.data) {
                const emails = result.data.map((tourist: any) => tourist.email).filter(Boolean);
                setTouristEmails(emails);
                setIsEmailsDialogOpen(true);
            }
        } catch (error) {
            console.error("Failed to fetch tourist emails:", error);
        } finally {
            setLoadingEmails(false);
        }
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

            <ViewAllEmailsDialog
                open={isEmailsDialogOpen}
                onClose={() => setIsEmailsDialogOpen(false)}
                emails={touristEmails}
            />

            <ManagementPageHeader
                title="Tourists Management"
                description="Manage tourist accounts and profiles"
                action={{
                    label: "Add Tourist",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
                secondaryAction={
                    <Button
                        variant="outline"
                        onClick={handleViewAllEmails}
                        disabled={loadingEmails}
                        className="gap-2"
                    >
                        <Mail className="w-4 h-4" />
                        {loadingEmails ? "Loading..." : "View All Emails"}
                    </Button>
                }
            />
        </>
    );
};

export default TouristsManagementHeader;
