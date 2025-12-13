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
console.log(data)
            if (data?.data?.status) {
                setPaymentStatus(data.data.status); // update UI
            }
        } catch (error) {

        }
    };

    // (optional) Auto-load status when page opens
    useEffect(() => {
        getPaymentStatus();
    }, []);
    console.log("booking",booking.status,"payment",paymentStatus)
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
                                                12+ Tour Completed
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
                                                ({reviewCount} testimonial{reviewCount !== 1 ? "s" : ""})
                                            </span>
                                        </div>

                                    </div>
                                </div>


                                <div className="text-sm text-gray-700">
                                    <p>
                                        <span className="font-semibold">Speaks:</span> {guideinfo?.spokenLanguages?.join(", ")}
                                    </p>
                                    <p className="mt-1">
                                        <span className="font-semibold">Starts at:</span> INR 1,200+
                                    </p>
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
                                    <div className="text-sm text-gray-600">
                                        <p className="font-semibold">Next Available Slot:</p>
                                        <p className="text-orange-600 font-medium">Tomorrow, 10:00 AM</p>
                                    </div>


                                    <button
                                        type="button"
                                        className="bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
                                    >
                                        View Profile →
                                    </button>
                                </div>
                            </div>
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

                    {/* BOOKING FORM */}
                    <aside className="border rounded-xl shadow-md p-6 h-fit bg-white sticky top-10">
  <h3 className="text-lg font-medium">Price</h3>
  <p className="text-3xl font-bold mt-2">BDT {tour?.fee}</p>

  {booking?.status === "COMPLETED" && paymentStatus === "PENDING" ? (
    <button
      onClick={handlePay}
      className="bg-red-500 text-white w-full py-3 rounded-lg mt-4 hover:bg-red-700"
    >
      PAY NOW
    </button>
  ) : booking?.status === "COMPLETED" && paymentStatus === "COMPLETED" ? (
    <button
      disabled
      className="bg-green-500 text-white w-full py-3 rounded-lg mt-4 cursor-not-allowed"
    >
      PAID
    </button>
  ) : booking?.status !== "COMPLETED" ? (
    <button
      className="bg-yellow-500 text-white w-full py-3 rounded-lg mt-4"
      disabled
    >
      {booking?.status || "N/A"}
    </button>
  ) : null}
</aside>

                </section>
            </main>
        </>
    );
}
