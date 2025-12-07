"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import AdminFormDialog from "./AdminFormDialog";
import ViewAllEmailsDialog from "./ViewAllEmailsDialog";
import { getAdmins } from "@/services/admin/adminsManagement";
import { Button } from "@/components/ui/button";

const AdminsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmailsDialogOpen, setIsEmailsDialogOpen] = useState(false);
  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [loadingEmails, setLoadingEmails] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleViewAllEmails = async () => {
    setLoadingEmails(true);
    try {
      // Fetch all admins with role filter
      const result = await getAdmins("role=ADMIN");
      if (result.success && result.data) {
        const emails = result.data.map((admin: any) => admin.email).filter(Boolean);
        setAdminEmails(emails);
        setIsEmailsDialogOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch admin emails:", error);
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
      <AdminFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ViewAllEmailsDialog
        open={isEmailsDialogOpen}
        onClose={() => setIsEmailsDialogOpen(false)}
        emails={adminEmails}
      />

      <ManagementPageHeader
        title="Admins Management"
        description="Manage admin accounts and permissions"
        action={{
          label: "Add Admin",
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

export default AdminsManagementHeader;
