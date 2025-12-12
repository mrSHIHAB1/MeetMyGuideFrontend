"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { createBooking } from "@/services/admin/bookingsManagement";
import { IBooking } from "@/types/booking.interface";

interface IBookingFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  booking?: IBooking; // only used for edit
}

const BookingFormDialog = ({
  open,
  onClose,
  onSuccess,
  booking,
}: IBookingFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const isEdit = Boolean(booking?._id);

  // ---- Action Handler ----
  const [state, formAction, isPending] = useActionState(createBooking, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Booking saved successfully!");

      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  // ---- Close Dialog ----
  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Booking" : "Add New Booking"}</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">

          {/* Hidden _id (needed for editing) */}
          {isEdit && <input type="hidden" name="_id" value={booking?._id} />}

          {/* Traveler */}
          <Field>
            <FieldLabel htmlFor="traveler">Traveler ID</FieldLabel>
            <Input
              id="traveler"
              name="traveler"
              defaultValue={""}
              placeholder="Traveler ObjectId"
            />
          </Field>

          {/* Guide */}
          <Field>
            <FieldLabel htmlFor="guide">Guide ID</FieldLabel>
            <Input
              id="guide"
              name="guide"
              defaultValue={""}
              placeholder="Guide ObjectId"
            />
          </Field>

          {/* Tour */}
          <Field>
            <FieldLabel htmlFor="tour">Tour ID</FieldLabel>
            <Input
              id="tour"
              name="tour"
              defaultValue={ ""}
              placeholder="Tour ObjectId"
            />
          </Field>

          {/* People */}
          <Field>
            <FieldLabel htmlFor="numberOfPeople">Number of People</FieldLabel>
            <Input
              id="numberOfPeople"
              name="numberOfPeople"
              type="number"
              defaultValue={booking?.numberOfPeople || ""}
              placeholder="2"
            />
          </Field>

          {/* Submit */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : isEdit ? "Update Booking" : "Create Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
