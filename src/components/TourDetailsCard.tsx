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
import { Bookmark, ClipboardClock, ClipboardType, Icon, MapPinned, Loader2 } from "lucide-react";

interface Guide {
  name: string;
  photo: string;
  bio: string;
  picture: string;
  spokenLanguages: string[];
  role: string;
  dailyrate: number;
  travelpreferences: string[];
  _id: string;
}

interface TourDetailsPageProps {
  tour: ITour;
  guideinfo?: Guide;
  wishlist: string[];
  avgrating: number;
  reviewCount: number;
}

export default function TourDetailsPage({ tour, guideinfo, wishlist = [], avgrating, reviewCount }: TourDetailsPageProps) {
  const router = useRouter();
  const images = tour.images ?? [];

  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const handleBooking = async () => {
    const tourist = await getUserInfo();

    if (tourist.id == '') {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (!date) {
      toast.error("Please select a date for your tour");
      return;
    }
    if (!time) {
      toast.error("Please select a time for your tour");
      return;
    }

    setLoading(true);
    try {
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
      toast.success("Booking Created Successfully")
      // optional: redirect to bookings page

    } catch (err: any) {
      toast.error(err.message || "Booking Failed")
    } finally {
      setLoading(false);
    }
  };

  const [isBookmarked, setIsBookmarked] = useState(false);

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

    setWishlistLoading(true);
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
      setWishlistLoading(false);
    }
  };

  return (
    <>
      <main className="pb-20">
        {/* Top Images */}
        <section className="max-w-4xl mx-auto mt-6 px-4">
          {images.length >= 0 && (
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
          )}
        </section>

        {/* Header */}
        <section className="max-w-6xl mx-auto mt-10 px-4">
          <h1 className="text-4xl font-bold">{tour.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span><MapPinned /></span> {tour.destination}
            </div>
            <div className="flex items-center gap-2">
              <span><ClipboardClock /></span> {tour.duration}
            </div>
            <div className="flex items-center gap-2">
              <span><ClipboardType /></span> {tour.category}
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleWishlist}
            >
              {wishlistLoading ? (
                <Loader2 className="animate-spin text-gray-400" size={20} />
              ) : (
                <Bookmark className={isBookmarked ? "text-red-500 fill-red-500" : "text-gray-400"} />
              )}
              <span>{isBookmarked ? "In Wishlist" : "Add to Wishlist"}</span>
            </div>
          </div>
        </section>

        {/* Content + Booking Sidebar */}
        <section className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Main Content */}
          <div className="space-y-6 bg-white p-6 rounded-xl shadow border">
            {/* Tour Title */}


            {/* Description */}

            <h3 className="font-semibold text-gray-800">Description</h3>
            <p className="text-gray-700 leading-relaxed ">{tour.description}</p>

            {/* Meeting Point */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Meeting Point</h3>
              <p className="text-gray-600">{tour.meetingPoint}</p>
            </div>
 <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Group Size</h3>
              <p className="text-gray-600">{tour.maxGroupSize} Person</p>
            </div>

            {/* Itinerary */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Travel Plan</h3>
              <p className="text-gray-600">{tour.itinerary}</p>
            </div>

          </div>
          {/* BOOKING FORM */}
          <aside className="bg-white p-6 rounded-xl shadow border flex flex-col gap-6 sticky top-10">
            {/* Guide Info */}
            {guideinfo && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={guideinfo.picture || "/bgimg.png"}
                      alt={guideinfo.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{guideinfo.name}</h2>
                    <p className="text-gray-600 text-sm">{guideinfo.role}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-orange-500">
                      <span>⭐ {avgrating}</span>
                      <span className="text-gray-500">({reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  <p><span className="font-semibold">Speaks:</span> {guideinfo.spokenLanguages.join(", ")}</p>
                
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {guideinfo.travelpreferences.map(pref => (
                    <span key={pref} className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">{pref}</span>
                  ))}
                </div>

                <button
                  onClick={() => router.push(`/guideDetails/${guideinfo._id}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition w-full"
                >
                  View Profile →
                </button>
              </div>
            )}

            {/* Booking Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Booking Fee</h3>
              <p className="text-3xl font-bold">BDT {tour.fee}</p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Request</label>
                <input
                  type="text"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Any special requirements?"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>


              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 className="animate-spin" /> Processing...</> : "Book Now"}
              </button>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}