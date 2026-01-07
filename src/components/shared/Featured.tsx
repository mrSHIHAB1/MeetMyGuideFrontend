"use client"
import { IBooking } from "@/types/booking.interface";
import { ITour } from "@/types/tour.interface";
import { PersonStandingIcon, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface FeaturedTour {
 data:ITour;
  totalBookings: number;
}

export default function Featured({ tours }: { tours: FeaturedTour[] } ) {
const router=useRouter();

  const [index, setIndex] = useState(0);
  const cardWidth = 320;

  const nextSlide = () => {
    
    if (index < tours.length - 4) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Most Popular <br /> Destination
        </h2>

        <div className="flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 p-5"
          style={{
            transform: `translateX(-${index * cardWidth}px)`,
          }}
        >
          {tours.map((item, i) => (
            <div
              key={i}
              className="min-w-[300px] bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-all duration-200 ease-in-out"
            >
              <img
                src={item.data.images?.[0] || '/placeholder.jpg'}
                alt={item.data.title || 'Tour Image'}
                className="h-44 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.data.title}</h3>
                <p className="text-gray-500 text-sm mb-3">
                {item.data.category}
                </p>

                <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-200 p-2 rounded-xl">
      <UserRound className="w-4 h-4 text-purple-600" />
      <span className="font-medium">{item.totalBookings}</span>
      <span className="text-gray-400">Bookings</span>
    </div>
                  <button onClick={() => router.push(`/tour/${item.data._id}`)} className="px-4 py-1 text-sm border rounded-full hover:bg-purple-600 hover:text-white transition">
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
  