"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, useCallback } from "react";
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

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <TourFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Tour Listing"
        description="Manage Tours"
        action={{
          label: "Add Tour",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default ToursManagementHeader;
