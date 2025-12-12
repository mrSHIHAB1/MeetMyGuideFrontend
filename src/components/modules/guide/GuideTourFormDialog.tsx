"use client";

import { useActionState, useEffect, useRef, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createTour, updateTour } from "@/services/admin/toursManagement";
import { ITour, TourCategory, TourStatus } from "@/types/tour.interface";

interface ITourFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    tour?: ITour;
}

const GuideTourFormDialog = ({
    open,
    onClose,
    onSuccess,
    tour,
}: ITourFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = Boolean(tour?._id);

    const actionHandler = isEdit
        ? updateTour.bind(null, tour!._id!)
        : createTour;

    const [state, formAction, isPending] = useActionState(actionHandler, null);

    const handleSuccess = useCallback(() => {
        onSuccess();
    }, [onSuccess]);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    /* 
       Prevents infinite loop because state persists but dependencies (handleSuccess/handleClose) 
       might change or component re-renders. 
    */
    const prevStateRef = useRef(state);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (!state) return;

        if (state.success) {
            toast.success(state.message || `Tour ${isEdit ? 'updated' : 'created'} successfully!`);
            formRef.current?.reset();
            handleSuccess();
            handleClose();
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, isEdit, handleSuccess, handleClose]);

    const handleDialogClose = () => {
        formRef.current?.reset();
        handleClose();
    };

    return (
        <Dialog open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) handleDialogClose(); // close only when dialog is actually closing
            }}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Tour" : "Add New Tour"}</DialogTitle>
                </DialogHeader>

                <form ref={formRef} action={formAction} className="space-y-4">
                    <Field>
                        <FieldLabel htmlFor="title">Title *</FieldLabel>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={tour?.title}
                            placeholder="Amazing City Tour"
                            required
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={tour?.description}
                            placeholder="Describe your tour..."
                            rows={3}
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="destination">Destination</FieldLabel>
                            <Input
                                id="destination"
                                name="destination"
                                defaultValue={tour?.destination}
                                placeholder="Paris, France"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="category">Category</FieldLabel>
                            <Select name="category" defaultValue={tour?.category || TourCategory.ALL}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(TourCategory).map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="fee">Fee ($) *</FieldLabel>
                            <Input
                                id="fee"
                                name="fee"
                                type="number"
                                step="0.01"
                                defaultValue={tour?.fee}
                                placeholder="99.99"
                                required
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="duration">Duration (hours) *</FieldLabel>
                            <Input
                                id="duration"
                                name="duration"
                                type="number"
                                step="0.5"
                                defaultValue={tour?.duration}
                                placeholder="3"
                                required
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="meetingPoint">Meeting Point</FieldLabel>
                            <Input
                                id="meetingPoint"
                                name="meetingPoint"
                                defaultValue={tour?.meetingPoint}
                                placeholder="Central Station"
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="maxGroupSize">Max Group Size</FieldLabel>
                            <Input
                                id="maxGroupSize"
                                name="maxGroupSize"
                                type="number"
                                defaultValue={tour?.maxGroupSize}
                                placeholder="10"
                            />
                        </Field>
                    </div>

                    <Field>
                        <FieldLabel htmlFor="itinerary">Itinerary</FieldLabel>
                        <Textarea
                            id="itinerary"
                            name="itinerary"
                            defaultValue={tour?.itinerary}
                            placeholder="Day-by-day schedule..."
                            rows={4}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <Select name="status" defaultValue={tour?.status || TourStatus.ACTIVE}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={TourStatus.ACTIVE}>Active</SelectItem>
                                <SelectItem value={TourStatus.INACTIVE}>Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="images">Tour Images (Max 8)</FieldLabel>
                        <Input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                        />
                    </Field>


                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={handleDialogClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="bg-gradient-to-b from-blue-600 to-blue-800">
                            {isPending ? "Saving..." : isEdit ? "Update Tour" : "Create Tour"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GuideTourFormDialog;
