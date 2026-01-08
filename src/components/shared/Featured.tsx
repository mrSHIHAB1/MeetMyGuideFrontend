"use client";

import { ITour } from "@/types/tour.interface";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface FeaturedTour {
  data: ITour;
  totalBookings: number;
}

export default function Featured({ tours }: { tours: FeaturedTour[] }) {
  const router = useRouter();

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [step, setStep] = useState(320); // move 1 card per click

  // 🔥 Calculate max scroll correctly (KEY FIX)
  useEffect(() => {
    const calculateSizes = () => {
      if (!viewportRef.current || !trackRef.current) return;

      const viewportWidth = viewportRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;

      setMaxTranslate(Math.max(trackWidth - viewportWidth, 0));

      // responsive step (card width)
      if (window.innerWidth < 640) setStep(280);
      else if (window.innerWidth < 1024) setStep(300);
      else setStep(320);

      setTranslateX(0); // reset on resize
    };

    calculateSizes();
    window.addEventListener("resize", calculateSizes);
    return () => window.removeEventListener("resize", calculateSizes);
  }, [tours]);

  const nextSlide = () => {
    setTranslateX((prev) => Math.min(prev + step, maxTranslate));
  };

  const prevSlide = () => {
    setTranslateX((prev) => Math.max(prev - step, 0));
  };

  return (
    <div className="container mx-auto  px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold pl-4">
          Most Popular <br className="hidden sm:block" /> Destination
        </h2>

        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            disabled={translateX === 0}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border
            flex items-center justify-center
            disabled:opacity-40 hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={translateX >= maxTranslate}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
            bg-purple-600 text-white
            flex items-center justify-center
            disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={viewportRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 transition-transform duration-500 p-2 sm:p-4"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {tours.map((item, i) => (
            <div
              key={i}
              className="
              min-w-[280px]
              sm:min-w-[300px]
              lg:min-w-[320px]
              bg-white rounded-xl shadow-md
              overflow-hidden hover:scale-105
              transition-all duration-200
              "
            >
              <img
                src={item.data.images?.[0] || "/placeholder.jpg"}
                alt={item.data.title}
                className="h-40 sm:h-44 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {item.data.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                  {item.data.category}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-200 px-3 py-1.5 rounded-xl">
                    <UserRound className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">
                      {item.totalBookings}
                    </span>
                    <span className="hidden sm:inline text-gray-400">
                      Bookings
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/tour/${item.data._id}`)
                    }
                    className="px-4 py-1 text-sm border rounded-full
                    hover:bg-purple-600 hover:text-white transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
