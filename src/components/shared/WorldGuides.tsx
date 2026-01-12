"use client";

import { MapPin, Phone, Plane } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Destination = {
  id: number;
  city: string;
  hotels: number;
  image: string;
};

export default function WorldGuides() {
  const destinations: Destination[] = [
    {
      id: 1,
      city: "Maldives",
      hotels: 980,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      city: "Japan",
      hotels: 1319,
      image:
        "https://images.unsplash.com/photo-1766933233626-8f784567dfed?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      city: "Chennai",
      hotels: 1497,
      image:
        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
    },
    {
      id: 4,
      city: "Kathmandu",
      hotels: 1152,
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada",
    },
    {
      id: 5,
      city: "Bali",
      hotels: 2100,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    },
  ];

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 320; // must match min-w

  // 🔁 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      slideTo((activeIndex + 1) % destinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const slideTo = (index: number) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollTo({
      left: index * CARD_WIDTH,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const router = useRouter();

  return (<>
    <main className="bg-white overflow-x-hidden py-16">
      {/* ---------- Title (inside container) ---------- */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl font-bold">
          Become A International Guide
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Expand your travel horizons with new facets! Explore the world by
          choosing your ideal travel destinations.
        </p>
      </div>

      {/* ---------- Carousel (OUTSIDE container) ---------- */}
      <div className="relative overflow-hidden">
        {/* CLIP WRAPPER – prevents scale overflow */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6 px-6"
            style={{ willChange: "transform" }}
          >
            {destinations.map((item, index) => (
              <div
                key={item.id}
                className={`min-w-[300px] h-[420px] rounded-2xl overflow-hidden relative
                transition-transform duration-500
                ${activeIndex === index
                    ? "scale-[1.05] opacity-100"
                    : "scale-95 opacity-60"
                  }`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.city}
                  className="w-full h-full object-cover"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-xl font-semibold">
                    {item.city}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Dots ---------- */}
        <div className="flex justify-center gap-3 mt-6">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => slideTo(index)}
              className={`w-3 h-3 rounded-full transition-all
                ${activeIndex === index
                  ? "bg-blue-600 scale-110"
                  : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </main>
    <div className="container mx-auto px-4 h-26  bg-blue-300 flex items-center justify-center">
      <Button onClick={() => router.push('/BecomeGuide')} className="bg-blue-600 cursor-pointer hover:bg-blue-700"><Plane></Plane> Become a International Guide </Button>
    </div>
  </>
  );
}

/* Reusable Input Component */
