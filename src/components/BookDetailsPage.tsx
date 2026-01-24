"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ITour } from "@/types/tour.interface";
import { useRouter } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { toast } from "sonner";
interface Guide {
    name: string;
    photo: string;
    bio: string;
    picture: string;
    spokenLanguages: string[];
    role: string;
    travelpreferences: string[];
    _id: string; // guide ID
}

interface TourDetailsPageProps {
    tour: ITour;
    guideinfo?: Guide;
    booking?: any;
    avgrating: number;
    reviewCount: number;
}

export default function BookDetailsPage({ tour, guideinfo, booking, avgrating, reviewCount }: TourDetailsPageProps) {
    const router = useRouter();
    const images = tour.images ?? [];

    const [paymentStatus, setPaymentStatus] = useState("PENDING");

    const getPaymentStatus = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/booking/${booking._id}`);
            const data = await res.json();

            if (data?.data?.status) {
                setPaymentStatus(data.data.status); // update UI
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        getPaymentStatus();
    }, []);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handlePay = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/checkout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "amount": tour.fee * 100,
                "currency": "bdt",
                "bookingId": booking._id,
                "tourId": tour._id

            }),
        });
        const session = await res.json();

        router.push(session.data.checkoutUrl);
    }
    const submitReview = async () => {
        const user = await getUserInfo();
        if (!user?.id) {
            toast.error("Please login first!");
            router.push("/login");
            return;
        }

        if (!rating) {
            toast.error("Please select a star rating!");
            return;
        }

        setSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/review/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    reviewerId: user.id,
                    guideId: guideinfo?._id,
                    tourId: tour._id,
                    rating,
                    comment: reviewComment,
                }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Review submitted successfully!");
                setRating(0);
                setReviewComment("");
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>

            <main className="pb-20">
                {/* Top Images */}
                <section className="max-w-6xl mx-auto mt-6 px-4">
                    {images.length >= 3 ? (
                        // ---------------------------
                        // SHOW SLIDER
                        // ---------------------------
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            className="h-72 md:h-96 rounded-lg overflow-hidden"
                            spaceBetween={10}
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        src={img}
                                        alt={`tour-image-${index}`}
                                        width={1200}
                                        height={800}
                                        className="w-full h-72 md:h-96 object-cover rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // ---------------------------
                        // SHOW GRID (up to 3 images)
                        // ---------------------------
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Image
                                src={images[0] || "/bgimg.png"}
                                alt="img-1"
                                width={1200}
                                height={800}
                                className="h-72 w-full object-cover rounded-lg"
                            />
                            <Image
                                src={images[1] || "/bgimg.png"}
                                alt="img-2"
                                width={1200}
                                height={800}
                                className="h-72 w-full object-cover rounded-lg"
                            />
                            <Image
                                src={images[2] || "/bgimg.png"}
                                alt="img-3"
                                width={1200}
                                height={800}
                                className="h-72 w-full object-cover rounded-lg"
                            />
                        </div>
                    )}
                </section>

                {/* Header */}
                <section className="max-w-6xl mx-auto mt-10 px-4">
                    <h1 className="text-4xl font-bold">{tour.title}</h1>
                    <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span>📍</span> {tour.destination}
                        </div>
                        <div className="flex items-center gap-2">
                            <span>⏱️</span> {tour.duration}
                        </div>
                        <div className="flex items-center gap-2">
                            <span>⭐</span> Easy
                        </div>
                        <div className="flex items-center gap-2">
                            <span>👶</span> Min Age 0
                        </div>
                    </div>
                </section>

                {/* Content + Booking Sidebar */}
                <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-4">
                    {/* MAIN CONTENT */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-semibold">Enjoy the Adventure</h2>
                        <p className="leading-relaxed text-gray-700">
                            Are you looking for an adventure of a lifetime? Join us on an unforgettable
                            journey through some of the world’s most stunning landscapes and cultural
                            destinations. Our expertly curated tours take you to incredible destinations...
                        </p>

                        <p className="leading-relaxed text-gray-700">
                            Our accommodations are carefully selected for comfort and convenience…
                        </p>

                        {/* Included / Excluded */}
                        <div className="mt-10">
                            <h3 className="text-2xl font-semibold mb-4">Guide Info</h3>
                            <div className="w-full mx-auto bg-white rounded-2xl shadow p-6 border flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={guideinfo?.picture || "/bgimg.png"}
                                            alt="Arlene McCoy profile image"
                                            width={64}
                                            height={64}
                                            className="object-cover h-16 w-16"
                                        />
                                    </div>


                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="text-xl font-semibold">{guideinfo?.name}</h2>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    {guideinfo?.role}
                                                </p>
                                            </div>


                                            <span className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md whitespace-nowrap">
                                                ({reviewCount} Tours Completed)
                                            </span>
                                        </div>


                                        <div className="flex items-center gap-2 mt-3 text-sm">
                                            <div className="flex items-center gap-1 text-orange-500">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.45a1 1 0 00.95.69h3.63c.969 0 1.371 1.24.588 1.81l-2.94 2.136a1 1 0 00-.364 1.118l1.12 3.45c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.915 2.362c-.786.57-1.838-.197-1.539-1.118l1.12-3.45a1 1 0 00-.364-1.118L2.462 8.877c-.783-.57-.38-1.81.588-1.81h3.63a1 1 0 00.95-.69l1.12-3.45z" />
                                                </svg>

                                                <span className="font-medium">
                                                    {avgrating}
                                                </span>
                                            </div>

                                            <span className="text-gray-500">
                                                ({reviewCount} Review{reviewCount !== 1 ? "s" : ""})
                                            </span>
                                        </div>

                                    </div>
                                </div>





                                <div className="flex flex-wrap gap-2 text-xs">
                                    {guideinfo?.travelpreferences?.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium whitespace-nowrap"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>


                                <div className="flex justify-between items-center pt-4 border-t">



                                    <button
                                        onClick={() => router.push(`/guideDetails/${guideinfo?._id}`)}
                                        type="button"
                                        className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
                                    >
                                        View Profile →
                                    </button>

                                </div>
                                <div className="mt-10 p-6 border rounded-xl bg-white shadow">
                                    <h3 className="text-2xl font-semibold mb-4">Leave a Review about the guide</h3>

                                    {/* STAR RATING */}
                                    <div className="flex gap-2 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                                onClick={() => setRating(star)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill={(hover || rating) >= star ? "orange" : "gray"}
                                                className="h-8 w-8 cursor-pointer transition"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.45a1
        1 0 00.95.69h3.63c.969 0 1.371 1.24.588
        1.81l-2.94 2.136a1 1 0 00-.364 1.118l1.12
        3.45c.3.921-.755 1.688-1.54 1.118L10
        13.347l-2.915 2.362c-.786.57-1.838-.197-1.539-1.118l1.12-3.45a1
        1 0 00-.364-1.118L2.462 8.877c-.783-.57-.38-1.81.588-1.81h3.63a1
        1 0 00.95-.69l1.12-3.45z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* COMMENT INPUT */}
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        className="w-full border rounded-lg p-3"
                                        rows={4}
                                        placeholder="Write your review..."
                                    />

                                    {/* SUBMIT BUTTON */}
                                    <button
                                        disabled={submitting}
                                        onClick={submitReview}
                                        className="bg-orange-500 text-white px-4 py-2 rounded-xl mt-4 hover:bg-orange-600"
                                    >
                                        {submitting ? "Submitting..." : "Submit Review"}
                                    </button>
                                </div>
                            </div>

                            <div>

                            </div>
                        </div>

                    </div>

                    {/* BOOKING FORM */}
                    <aside className="h-fit sticky top-10">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
                            {/* Header */}
                            <div className="mb-6 pb-4 border-b border-blue-400/30">
                                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Tour Price</p>
                                <h3 className="text-4xl font-bold mt-2">BDT {tour?.fee}</h3>
                            </div>

                            {/* Payment Status & Details */}
                            <div className="space-y-4 mb-6">
                                <div className="bg-blue-500/30 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20">
                                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide mb-1">Booking Status</p>
                                    <p className="text-lg font-semibold capitalize">{booking?.status || "N/A"}</p>
                                </div>

                                <div className="bg-blue-500/30 backdrop-blur-sm rounded-lg p-4 border border-blue-400/20">
                                    <p className="text-xs font-semibold text-blue-100 uppercase tracking-wide mb-1">Payment Status</p>
                                    <p className="text-lg font-semibold capitalize">{paymentStatus}</p>
                                </div>
                            </div>

                            {/* Payment Action Button */}
                            {booking?.status === "COMPLETED" && paymentStatus === "PENDING" ? (
                                <button
                                    onClick={handlePay}
                                    className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Complete Payment Now
                                </button>
                            ) : booking?.status === "COMPLETED" && paymentStatus === "COMPLETED" ? (
                                <button
                                    disabled
                                    className="w-full bg-green-400 text-white py-4 rounded-xl font-bold text-lg cursor-default shadow-lg flex items-center justify-center gap-2 opacity-90"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Payment Complete
                                </button>
                            ) : booking?.status !== "COMPLETED" ? (
                                <button
                                    disabled
                                    className="w-full bg-yellow-400 text-gray-900 py-4 rounded-xl font-bold text-lg cursor-not-allowed shadow-lg opacity-75"
                                >
                                    Awaiting Confirmation
                                </button>
                            ) : null}

                            {/* Security Badge */}
                            <div className="mt-6 pt-4 border-t border-blue-400/30 flex items-center justify-center gap-2 text-blue-100 text-xs">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span>Secure payment powered by Stripe</span>
                            </div>
                        </div>

                        {/* Additional Info Card */}
                        <div className="mt-4 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">What's Included</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                                    <span>Professional tour guide</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                                    <span>Guided experience</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold mt-0.5">✓</span>
                                    <span>Support & assistance</span>
                                </li>
                            </ul>
                        </div>
                    </aside>

                </section>
            </main>
        </>
    );
}
