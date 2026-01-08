'use client';

import { IGuide } from "@/types/guide.interface";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FeaturedGuides {
  data: IGuide;
  totalReviews: number;
  averageRating: number;
}

export default function SeamlessCarousel({
  guides,
}: {
  guides: FeaturedGuides[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [step, setStep] = useState(0); // REAL card width

  // ✅ Measure everything properly
  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current || !cardRef.current)
        return;

      const viewportWidth = viewportRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;

      // max scroll limit
      setMaxTranslate(Math.max(trackWidth - viewportWidth, 0));

      // measure real card width INCLUDING gap
      const cardRect = cardRef.current.getBoundingClientRect();
      const nextCard = cardRef.current.nextElementSibling as HTMLElement;

      let gap = 0;
      if (nextCard) {
        gap =
          nextCard.getBoundingClientRect().left -
          cardRect.right;
      }

      setStep(cardRect.width + gap);

      setTranslateX(0); // reset on resize
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [guides]);

  const nextSlide = () => {
    setTranslateX((prev) => Math.min(prev + step, maxTranslate));
  };

  const prevSlide = () => {
    setTranslateX((prev) => Math.max(prev - step, 0));
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 overflow-hidden">
      {/* Header */}
      <div className="container px-8 mx-auto mb-10 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Meet Our Tour Guides
        </h2>

        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            disabled={translateX === 0}
            className="w-10 h-10 rounded-full border
            flex items-center justify-center
            disabled:opacity-40 hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={translateX >= maxTranslate}
            className="w-10 h-10 rounded-full bg-blue-500 text-white
            flex items-center justify-center
            disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={viewportRef} className="container  mx-auto overflow-hidden  px-6 ">
        <div
          ref={trackRef}
          className="flex gap-6 transition-transform duration-500"
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {guides.map((guide, i) => (
            <div
              key={guide.data._id}
              ref={i === 0 ? cardRef : null} // 👈 measure first card
              className="relative min-w-[280px] sm:min-w-[300px]  select-none"
            >
              <div className="bg-gray-100 rounded-3xl p-5 pb-4 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {guide.data.name}
                </h3>

                <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-4">
                  <img
                    src={guide.data.picture ?? ""}
                    alt={guide.data.name}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={guide.data.picture ?? ""}
                        alt={guide.data.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600">
                        {guide.data.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-semibold">
                          {guide.averageRating}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {guide.totalReviews} tours
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-blue-600 transition">
                    View Profile
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
