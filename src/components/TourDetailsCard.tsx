"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ITour } from "@/types/tour.interface";
import { useRouter } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";

interface Guide {
  name: string;
  photo: string;
  bio: string;
  picture: string;
  _id: string; // guide ID
}

interface TourDetailsPageProps {
  tour: ITour;
  guideinfo: Guide;
}

export default function TourDetailsPage({ tour, guideinfo }: TourDetailsPageProps) {
  const router = useRouter();
  const images = tour.images ?? [];
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextImage = () => images.length && setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => images.length && setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleBooking = async () => {
    const tourist= await getUserInfo();
    
    setLoading(true);
    console.log("here",tourist.id)
    try {
      // Get traveler info (simulate with a dummy function or fetch from auth)
      // replace with actual user session

      const res = await serverFetch.post("/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourist:tourist.id,
          guide: guideinfo._id,
          tour: tour._id,
        }),
      });

    

      alert("Booking created successfully!");
      // optional: redirect to bookings page
    
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Image Slider */}
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImage]}
                alt="Tour"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <button onClick={prevImage} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                ◀
              </button>
              <button onClick={nextImage} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
                ▶
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
              No images available
            </div>
          )}
        </div>

        {/* Tour Content */}
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{tour.title}</h1>
          <p className="text-gray-700 leading-relaxed">{tour.description}</p>

          {/* Guide Info */}
          {guideinfo && (
            <div className="mt-8 p-4 bg-gray-100 rounded-xl flex items-center gap-4">
              <img src={guideinfo.picture} className="w-20 h-20 rounded-full object-cover" alt="Guide" />
              <div>
                <h3 className="text-xl font-bold">{guideinfo.name}</h3>
                <p className="text-gray-600">{guideinfo.bio}</p>
              </div>
            </div>
          )}

          {/* Booking Button */}
          <div className="mt-6">
            <Button
              className="w-full text-lg py-6 rounded-xl"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Now"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
