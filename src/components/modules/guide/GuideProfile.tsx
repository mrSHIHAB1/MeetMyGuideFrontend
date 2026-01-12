"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { MapPin, Clock, Users, DollarSign, Star, Phone, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

interface Review {
    _id: string;
    comment: string;
    rating: number;
    reviewer: { name: string };
    createdAt: string;
}

interface GuideProfileProps {
    guidedata: any;
    tours: any[];
    review?: {
        avgRating: number;
        count: number;
        reviews: Review[];
    };
}

const GuideProfile = ({ guidedata, tours, review }: GuideProfileProps) => {
    const router = useRouter();

    // Ensure tours is an array
    const safeTours = Array.isArray(tours) ? tours : [];

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Guide Profile</h1>
                <p className="text-gray-600 mt-1">
                    View guide details, reviews, and active tour listings
                </p>
            </div>

            {/* PROFILE CARD */}
            <Card>
                <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                    <Avatar className="h-32 w-32">
                        {guidedata.data.picture ? (
                            <AvatarImage
                                src={guidedata.data.picture}
                                alt={guidedata.data.name}
                            />
                        ) : (
                            <AvatarFallback className="text-3xl">
                                {guidedata.data.name[0]}
                            </AvatarFallback>
                        )}
                    </Avatar>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">{guidedata.data.name}</h2>
                        <p className="text-sm text-gray-500">{guidedata.data.email}</p>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {review?.avgRating ? review.avgRating.toFixed(1) : "-"}
                        </Badge>

                        <Badge variant="secondary">
                            Total Tours Completed:
                            {review?.count || "-"}
                        </Badge>
                        <div className="flex flex-wrap gap-2 mt-2">

                            <Badge variant="secondary">
                                <Globe />
                                {guidedata.data?.spokenLanguages || "-"}
                            </Badge>

                            <Badge variant="secondary">
                                <Phone />
                                {guidedata.data?.phone || "-"}
                            </Badge>
                        </div>

                        {guidedata.data.address && (
                            <Badge variant="secondary">
                                <MapPin />
                                {guidedata.data?.address || "-"}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* MAIN CONTENT: Reviews (left) + Tours (right) */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* REVIEWS */}
                <div className="lg:w-1/2 space-y-4">
                    <h2 className="text-2xl font-bold mb-2">Reviews</h2>

                    {review?.reviews?.length === 0 || !review ? (
                        <p className="text-gray-500">No reviews yet.</p>
                    ) : (
                        review.reviews.map((r) => (
                            <Card key={r._id} className="border shadow-sm">
                                <CardContent className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">{r.reviewer.name}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span>{r.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">{r.comment}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(r.createdAt).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* ACTIVE TOURS */}
                <div className="lg:w-1/2 space-y-4">
                    <h2 className="text-2xl font-bold mb-2">Active Tours</h2>

                    {safeTours.length === 0 ? (
                        <p className="text-gray-500">No active tours available.</p>
                    ) : (
                        safeTours.map((tour) => (
                            <div
                                key={tour._id}
                                className="flex bg-white border rounded-xl p-4 shadow-sm gap-4 hover:shadow-md transition"
                            >
                                {/* IMAGE */}
                                <div className="w-40 h-28 rounded-lg overflow-hidden">
                                    <img
                                        src={tour.images?.[0] || "/no-image.jpg"}
                                        alt={tour.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="flex justify-between w-full">
                                    <div>
                                        <h3 className="font-semibold text-lg">{tour.title}</h3>
                                        <p className="text-gray-600 text-sm">{tour.destination}</p>

                                        <p className="mt-3 text-sm">
                                            {tour.duration} Hours •{" "}
                                            <span className="font-medium text-green-600">
                                                {tour.status}
                                            </span>
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Max Group Size: {tour.maxGroupSize}
                                        </p>
                                    </div>

                                    <div className="text-right flex flex-col justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Tour Fee</p>
                                            <p className="font-semibold text-lg">{tour.fee} BDT</p>
                                        </div>

                                        <button
                                            className="text-sm text-blue-600 hover:underline cursor-pointer"
                                            onClick={() => router.push(`/tour/${tour._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuideProfile;
