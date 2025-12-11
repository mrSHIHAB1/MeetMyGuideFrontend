"use client";

import { ITour } from "@/types/tour.interface";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TourFormDialog from "@/components/modules/Admin/ToursManagement/TourFormDialog";
import { Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTour } from "@/services/guide/tourMangement";

interface ToursListProps {
    tours: ITour[];
}

export const ToursList = ({ tours }: ToursListProps) => {
    const router = useRouter();
    const [selectedTour, setSelectedTour] = useState<ITour | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleView = (tour: ITour) => {
        setSelectedTour(tour);
        setIsViewDialogOpen(true);
    };

    const handleEdit = (tour: ITour) => {
        setSelectedTour(tour);
        setIsEditDialogOpen(true);
    };

    const handleDelete = (tour: ITour) => {
        setSelectedTour(tour);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedTour?._id) return;

        try {
            const result = await deleteTour(selectedTour._id);

            if (result.success) {
                toast.success("Tour deleted successfully!");
                setIsDeleteDialogOpen(false);
                setSelectedTour(null);
                router.refresh();
            } else {
                toast.error(result.message || "Failed to delete tour");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the tour");
        }
    };

    if (!tours || tours.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-500">No tours found</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-6 ">
                {tours.map((tour) => (
                    <div
                        key={tour._id}
                        className="card card-side bg-base-100 shadow-sm rounded-xl overflow-hidden"
                    >
                        {/* Left Image */}
                        <figure className="w-48 h-full">
                            <img
                                src={
                                    tour.images?.[0] ||
                                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                }
                                alt={tour.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>

                        {/* Right Content */}
                        <div className="card-body p-4">
                            {/* Duration */}
                            <div className="border shadow-xs p-2 rounded-xl flex items-center gap-2 w-fit">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <p className="text-sm">{tour.duration} hours</p>
                            </div>

                            {/* Title */}
                            <h2 className="card-title">{tour.title}</h2>

                            {tour.destination && (
                                <p className="text-sm text-gray-600">📍 {tour.destination}</p>
                            )}

                            {tour.category && (
                                <span className="badge badge-primary badge-sm w-fit">
                                    {tour.category}
                                </span>
                            )}

                            <p className="text-sm line-clamp-2">
                                {tour.description || "Explore this amazing tour"}
                            </p>

                            {/* Price + Actions */}
                            <div className="flex justify-between items-center mt-auto pt-3">
                                <p className="font-bold text-lg">${tour.fee}</p>

                                <div className="flex gap-2">
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => handleView(tour)}
                                        title="View Details"
                                    >
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleEdit(tour)}
                                        title="Edit Tour"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleDelete(tour)}
                                        title="Delete Tour"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Edit Dialog */}
            <TourFormDialog
                open={isEditDialogOpen}
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setSelectedTour(null);
                }}
                onSuccess={() => {
                    setIsEditDialogOpen(false);
                    setSelectedTour(null);
                    router.refresh();
                }}
                tour={selectedTour || undefined}
            />

            {/* View Dialog */}
            {isViewDialogOpen && selectedTour && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">{selectedTour.title}</h3>

                        {selectedTour.images && selectedTour.images.length > 0 && (
                            <div className="mb-4">
                                <img
                                    src={selectedTour.images[0]}
                                    alt={selectedTour.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold">Description:</p>
                                <p className="text-sm text-gray-600">{selectedTour.description || "N/A"}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Fee:</p>
                                    <p className="text-sm">${selectedTour.fee}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Duration:</p>
                                    <p className="text-sm">{selectedTour.duration} hours</p>
                                </div>
                            </div>

                            {selectedTour.destination && (
                                <div>
                                    <p className="font-semibold">Destination:</p>
                                    <p className="text-sm">{selectedTour.destination}</p>
                                </div>
                            )}

                            {selectedTour.category && (
                                <div>
                                    <p className="font-semibold">Category:</p>
                                    <span className="badge badge-primary">{selectedTour.category}</span>
                                </div>
                            )}

                            {selectedTour.meetingPoint && (
                                <div>
                                    <p className="font-semibold">Meeting Point:</p>
                                    <p className="text-sm">{selectedTour.meetingPoint}</p>
                                </div>
                            )}

                            {selectedTour.maxGroupSize && (
                                <div>
                                    <p className="font-semibold">Max Group Size:</p>
                                    <p className="text-sm">{selectedTour.maxGroupSize} people</p>
                                </div>
                            )}

                            {selectedTour.itinerary && (
                                <div>
                                    <p className="font-semibold">Itinerary:</p>
                                    <p className="text-sm text-gray-600">{selectedTour.itinerary}</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => {
                                    setIsViewDialogOpen(false);
                                    setSelectedTour(null);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Delete Confirmation Dialog */}
            {isDeleteDialogOpen && selectedTour && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Tour</h3>
                        <p className="py-4">
                            Are you sure you want to delete <strong>{selectedTour.title}</strong>? This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => {
                                    setIsDeleteDialogOpen(false);
                                    setSelectedTour(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
};
