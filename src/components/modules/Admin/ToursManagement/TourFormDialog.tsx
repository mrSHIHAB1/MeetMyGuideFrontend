"use client";

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
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { ITour } from "@/types/tour.interface";
import { createTour, updateTour } from "@/services/guide/tourMangement";


interface ITourFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour?: ITour;
}

const TourFormDialog = ({ open, onClose, onSuccess, tour }: ITourFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!tour?._id;

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateTour.bind(null, tour?._id as string) : createTour,
    null
  );

  const [images, setImages] = useState<File[]>([]);
  const hasHandledSuccessRef = useRef(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImages(files);
  };

  useEffect(() => {
    if (open) {
      hasHandledSuccessRef.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (state?.success && !hasHandledSuccessRef.current) {
      hasHandledSuccessRef.current = true;

      toast.success(state.message || "Tour saved successfully");

      formRef.current?.reset();
      setImages([]);

      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const handleClose = () => {
    setImages([]);
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Tour" : "Create New Tour"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="flex flex-col flex-1">
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="Sundarban Adventure Tour"
                defaultValue={tour?.title || ""}
              />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="Describe the tour"
                defaultValue={tour?.description || ""}
              />
            </Field>

            {/* Itinerary */}
            <Field>
              <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
              <Input
                id="itinerary"
                name="itinerary"
                placeholder="Day 1..., Day 2..."
                defaultValue={tour?.itinerary || ""}
              />
            </Field>

            {/* Fee */}
            <Field>
              <FieldLabel htmlFor="fee">Fee (৳)</FieldLabel>
              <Input
                id="fee"
                name="fee"
                type="number"
                placeholder="1500"
                defaultValue={tour?.fee || ""}
              />
            </Field>

            {/* Duration */}
            <Field>
              <FieldLabel htmlFor="duration">Duration (hours)</FieldLabel>
              <Input
                id="duration"
                name="duration"
                type="number"
                placeholder="3"
                defaultValue={tour?.duration || ""}
              />
            </Field>

            {/* Meeting Point */}
            <Field>
              <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
              <Input
                id="meetingPoint"
                name="meetingPoint"
                placeholder="Dhaka Airport"
                defaultValue={tour?.meetingPoint || ""}
              />
            </Field>

            {/* Max Group Size */}
            <Field>
              <FieldLabel htmlFor="maxGroupSize">Max Group Size</FieldLabel>
              <Input
                id="maxGroupSize"
                name="maxGroupSize"
                type="number"
                placeholder="10"
                defaultValue={tour?.maxGroupSize || ""}
              />
            </Field>

            {/* Images */}
            <Field>
              <FieldLabel htmlFor="images">Tour Images</FieldLabel>

              {/* Preview */}
              {images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-2">
                  {images.map((img, i) => (
                    <Image
                      key={i}
                      src={URL.createObjectURL(img)}
                      width={60}
                      height={60}
                      alt="preview"
                      className="rounded-md"
                    />
                  ))}
                </div>
              )}

              <Input
                id="images"
                name="images"
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Field>

          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Update Tour" : "Create Tour"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TourFormDialog;
