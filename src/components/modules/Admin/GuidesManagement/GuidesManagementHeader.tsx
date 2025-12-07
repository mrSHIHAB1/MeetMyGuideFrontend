"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import GuideFormDialog from "./GuideFormDialog";
import ViewAllEmailsDialog from "./ViewAllEmailsDialog";
import { getGuides } from "@/services/admin/guidesManagement";
import { Button } from "@/components/ui/button";

const GuidesManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEmailsDialogOpen, setIsEmailsDialogOpen] = useState(false);
    const [guideEmails, setGuideEmails] = useState<string[]>([]);
    const [loadingEmails, setLoadingEmails] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleViewAllEmails = async () => {
        setLoadingEmails(true);
        try {
            // Fetch all guides with role filter
            const result = await getGuides("role=GUIDE");
            if (result.success && result.data) {
                const emails = result.data.map((guide: any) => guide.email).filter(Boolean);
                setGuideEmails(emails);
                setIsEmailsDialogOpen(true);
            }
        } catch (error) {
            console.error("Failed to fetch guide emails:", error);
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
            <GuideFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ViewAllEmailsDialog
                open={isEmailsDialogOpen}
                onClose={() => setIsEmailsDialogOpen(false)}
                emails={guideEmails}
            />

            <ManagementPageHeader
                title="Guides Management"
                description="Manage guide accounts and profiles"
                action={{
                    label: "Add Guide",
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

export default GuidesManagementHeader;
