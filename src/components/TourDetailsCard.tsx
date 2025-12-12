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
import { Bookmark, Icon } from "lucide-react";
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
  wishlist:string[]
}

export default function TourDetailsPage({ tour, guideinfo,wishlist=[] }: TourDetailsPageProps) {
  const router = useRouter();
  const images = tour.images ?? [];

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleBooking = async () => {
    const tourist = await getUserInfo();

    setLoading(true);
    if (tourist.id == '') {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    try {
      // Get traveler info (simulate with a dummy function or fetch from auth)
      // replace with actual user session
      const payload = {
        tourist: tourist.id,
        guide: guideinfo?._id,
        tour: tour._id,
        requestedDate: date,
        requestedTime: time,
        specialRequests: specialRequest,
      }
      const res = await serverFetch.post("/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),




      });

      console.log(payload)
      alert("Booking created successfully!");
      // optional: redirect to bookings page

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
 
 

  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if this tour is already in wishlist
  useEffect(() => {
    if (tour._id && wishlist.includes(tour._id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [wishlist, tour._id]);
  const toggleWishlist = async () => {
    const user = await getUserInfo();
    if (!user.id) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const endpoint = `/user/${user.id}/wishlist/${isBookmarked ? "remove" : "add"}`;
      const res = await serverFetch[isBookmarked ? "delete" : "post"](endpoint, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tourId: tour._id }),
      });

      const data = await res.json();

      if (data.success) {
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? "Removed from wishlist" : "Added to wishlist");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>

      <main className="pb-20">
        {/* Top Images */}
        <section className="max-w-4xl mx-auto mt-6 px-4">
          {images.length >= 0 && (
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
                    fill
                    className="w-72 h-72 md:h-96 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) }
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
              <span>⭐</span> {tour.category}
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleWishlist}>
            <Bookmark className={isBookmarked ? "text-red-500" : "text-gray-400"} />
            <span>{isBookmarked ? "In Wishlist" : "Add to Wishlist"}</span>
          </div>
           
          </div>
        </section>

        {/* Content + Booking Sidebar */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-4">
          {/* MAIN CONTENT */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Enjoy the Adventure</h2>
            <p className="leading-relaxed text-gray-700">
              {tour.description}
            </p>

            <p className="leading-relaxed text-gray-700">
              Our accommodations are carefully selected for comfort and convenience…
            </p>

            {/* Included / Excluded */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-4">Guide Information</h3>
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
                          aria-hidden
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.12 3.45a1 1 0 00.95.69h3.63c.969 0 1.371 1.24.588 1.81l-2.94 2.136a1 1 0 00-.364 1.118l1.12 3.45c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.915 2.362c-.786.57-1.838-.197-1.539-1.118l1.12-3.45a1 1 0 00-.364-1.118L2.462 8.877c-.783-.57-.38-1.81.588-1.81h3.63a1 1 0 00.95-.69l1.12-3.45z" />
                        </svg>
                        <span className="font-medium">4.5</span>
                      </div>
                      <span className="text-gray-500">(23 testimonials)</span>
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
                    onClick={() => router.push(`/guide-profile/${guideinfo?._id}`)}
                  >
                    View Profile →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOOKING FORM */}
          <aside className="border rounded-xl shadow-md p-6 h-fit bg-white sticky top-10">
            <h3 className="text-lg font-medium">Price</h3>
            <p className="text-3xl font-bold mt-2">BDT  {tour?.fee}</p>

            <div className="mt-6 space-y-4">
              <div>
                <label>Date</label>
                <input
                  type="date"
                  className="w-full mt-1 border px-3 py-2 rounded"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label>Time</label>
                <input
                  type="time"
                  className="w-full mt-1 border px-3 py-2 rounded"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div>
                <label>Special Request</label>
                <input
                  type="text"
                  className="w-full mt-1 border px-3 py-2 rounded"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                />
              </div>

              <div className="space-y-2 mt-4">
                <h4 className="font-medium">Itinerary</h4>
                <label className="flex items-center gap-2">
                  {tour.itinerary}
                </label>

              </div>

              <button onClick={handleBooking} className="bg-purple-600 text-white w-full py-3 rounded-lg mt-4 hover:bg-purple-700">
                Book Now
              </button>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
