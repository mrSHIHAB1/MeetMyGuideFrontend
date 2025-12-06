"use client";
import { ITour } from "@/types/tour.interface";
import { useRouter } from "next/navigation";

interface ToursListProps {
    tours: ITour[];
}

export const ToursList = ({ tours }: ToursListProps) => {
    const router = useRouter();

    if (!tours || tours.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-gray-500">No tours found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
                <div key={tour._id} className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src={tour.images?.[0] || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                            alt={tour.title}
                            className="w-full h-48 object-cover"
                        />
                    </figure>
                    <div className="p-2">
                        <div className="border-3 shadow-xs p-2 rounded-xl flex items-center gap-2">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                            <p className="text-sm">{tour.duration} hours</p>
                        </div>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">{tour.title}</h2>
                        {tour.destination && (
                            <p className="text-sm text-gray-600">📍 {tour.destination}</p>
                        )}
                        {tour.category && (
                            <span className="badge badge-primary badge-sm">{tour.category}</span>
                        )}
                        <p className="text-sm line-clamp-2">{tour.description || "Explore this amazing tour"}</p>
                        <div className="card-actions justify-between items-center mt-4">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => router.push(`/tour/${tour._id}`)}
                            >
                                Explore
                            </button>
                            <p className="font-bold text-xl">${tour.fee}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
