import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createGuide, updateGuide } from "@/services/admin/guidesManagement";
import { IGuide } from "@/types/guide.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IGuideFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    guide?: IGuide;
}

const GuideFormDialog = ({
    open,
    onClose,
    onSuccess,
    guide,
}: IGuideFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isEdit = !!(guide?._id || guide?.id);

    const [state, formAction, isPending] = useActionState(
        isEdit ? updateGuide.bind(null, (guide?._id || guide?.id) as string) : createGuide,
        null
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const hasHandledSuccessRef = useRef(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file || null);
    };

    // Reset the handled flag when dialog opens/closes
    useEffect(() => {
        if (open) {
            hasHandledSuccessRef.current = false;
        }
    }, [open]);

    // Handle success/error from server
    useEffect(() => {
        if (state?.success && !hasHandledSuccessRef.current) {
            hasHandledSuccessRef.current = true;
            toast.success(state.message || "Operation successful");
            if (formRef.current) {
                formRef.current.reset();
            }
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);

            // Restore file to input after error
            if (selectedFile && fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(selectedFile);
                fileInputRef.current.files = dataTransfer.files;
            }
        }
    }, [state, selectedFile]);

    const handleClose = () => {
        setSelectedFile(null);
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Edit Guide" : "Add New Guide"}</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Basic Information */}
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                defaultValue={state?.formData?.name || guide?.name || ""}
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="guide@example.com"
                                defaultValue={state?.formData?.email || guide?.email || ""}
                                disabled={isEdit}
                            />
                            <InputFieldError field="email" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
                            <Input
                                id="contactNumber"
                                name="contactNumber"
                                placeholder="+1234567890"
                                defaultValue={
                                    state?.formData?.phone|| guide?.phone|| ""
                                }
                            />
                            <InputFieldError field="contactNumber" state={state} />
                        </Field>
                        <Field>
    <FieldLabel htmlFor="isVerified">Is Verified</FieldLabel>
    <select
      id="isVerified"
      name="isVerified"
      defaultValue={guide?.isVerified ? "true" : "false"}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
    <InputFieldError field="isVerified" state={state} />
  </Field>

  <Field>
    <FieldLabel htmlFor="isBlocked">Is Blocked</FieldLabel>
    <select
      id="isBlocked"
      name="isBlocked"
      defaultValue={guide?.isblocked ? "true" : "false"}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
    <InputFieldError field="isBlocked" state={state} />
  </Field>

  <Field>
    <FieldLabel htmlFor="address">Address</FieldLabel>
    <Input
      id="address"
      name="address"
      placeholder="Enter address"
      defaultValue={state?.formData?.address || guide?.address || ""}
    />
    <InputFieldError field="address" state={state} />
  </Field>
                        {/* Password Field (Create Mode Only) */}
                        {!isEdit && (
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    defaultValue={state?.formData?.password || ""}
                                />
                                <InputFieldError field="password" state={state} />
                            </Field>
                        )}

                        {/* Profile Photo (Create Mode Only) */}
                        {!isEdit && (
                            <Field>
                                <FieldLabel htmlFor="file">Profile Photo</FieldLabel>
                                {selectedFile && (
                                    <div className="mb-2">
                                        <Image
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Profile Photo Preview"
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    </div>
                                )}

                                <Input
                                    ref={fileInputRef}
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Upload a profile photo for the guide
                                </p>
                                <InputFieldError field="profilePhoto" state={state} />
                            </Field>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Saving..."
                                : isEdit
                                    ? "Update Guide"
                                    : "Create Guide"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GuideFormDialog;
