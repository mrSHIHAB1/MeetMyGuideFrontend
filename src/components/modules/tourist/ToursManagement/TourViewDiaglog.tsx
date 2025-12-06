"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IBooking } from "@/types/booking.interface";
import { ITour } from "@/types/tour.interface";

const TourViewDialog = ({
  open,
  onClose,
  tour,
}: {
  open: boolean;
  onClose: () => void;
  tour: IBooking| null;
}) => {
  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{tour.status}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p><strong>Location:</strong> {tour.status}</p>
          <p><strong>Price:</strong> {tour.status} BDT</p>
          <p><strong>Duration:</strong> {tour.status}</p>
          <p><strong>Description:</strong></p>
          <p className="text-muted-foreground">{tour.status}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourViewDialog;
