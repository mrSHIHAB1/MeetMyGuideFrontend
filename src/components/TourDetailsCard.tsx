"use client";
import { useEffect, useState, useRef } from "react";
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
  const mainSwiperRef = useRef<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
        {/* Top Images - Enhanced Banner with Thumbnails */}
        <section className="w-full bg-white py-4 sm:py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            {images.length >= 0 && (
              <div className="space-y-3 sm:space-y-4">
                {/* Main Image Carousel */}
                <div className="relative group">
                  <Swiper
                    ref={mainSwiperRef}
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
                    spaceBetween={10}
                    onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                  >
                    {images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                          <Image
                            src={img}
                            alt={`tour-image-${index}`}
                            fill
                            priority={index === 0}
                            className="w-full h-full object-cover"
                          />
                          {/* Overlay for better text contrast on next section */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Image counter badge */}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold z-10">
                      {activeImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          mainSwiperRef.current?.swiper.slideTo(index);
                          setActiveImageIndex(index);
                        }}
                        className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                          activeImageIndex === index
                            ? "border-blue-500 shadow-lg ring-2 ring-blue-400"
                            : "border-gray-400 hover:border-blue-300 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`thumbnail-${index}`}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Header */}
        <section className="container mx-auto mt-10 px-4">
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
        <section className="container mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT: Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-500">About This Tour</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">{tour.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Meeting Point */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-7 rounded-xl sm:rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
                <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-3">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">📍</span>
                  Meeting Point
                </h4>
                <p className="text-gray-700 text-sm sm:text-base">{tour.meetingPoint}</p>
              </div>

              {/* Group Size */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-7 rounded-xl sm:rounded-2xl border border-green-100 hover:shadow-md transition-shadow">
                <h4 className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-3">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">👥</span>
                  Group Size
                </h4>
                <p className="text-gray-700 text-sm sm:text-base font-semibold">{tour.maxGroupSize ?? 0} Person{(tour.maxGroupSize ?? 0) > 1 ? "s" : ""}</p>
              </div>
            </div>

            {/* Travel Plan Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-orange-500">Travel Plan & Itinerary</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">{tour.itinerary}</p>
              </div>
            </div>
          </div>
          {/* BOOKING FORM */}
          <aside className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 h-fit sticky top-10">
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
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition w-full cursor-pointer"
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
                className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
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