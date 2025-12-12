"use client"
import { ITour } from "@/types/tour.interface";
import { Link, Mail, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface TourCardProps {
  tour: ITour;
}
export const TourCard = ({ tour }: TourCardProps) => {
  const router = useRouter();
  return (
    <>
      <div className="w-[full] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="relative h-56 w-full">
          <Image
            src={tour?.images?.[0] || "/bgimg.png"}   // <-- change to your image
            alt="Bangkok"
            fill
            className="object-cover"
          />
          <span className="absolute top-1 right-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
           {tour.category}
          </span>
        </div>

        {/* Trip Info */}
        <div className="px-5 mt-2">
          <div className="bg-white shadow-md rounded-xl p-3 flex justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>
              {tour.duration}Hours 
            </div>

            <div className="flex items-center gap-4">
              
              <Users size={16} /><p>{tour.maxGroupSize}</p>
            </div>
          </div>

          {/* Country & Title */}
          <div className="mt-5">
            <h2 className="text-xl font-semibold">{tour.title}</h2>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <MapPin size={16} className="text-purple-500" />
              {tour.destination}
            </div>
          </div>

          {/* Description */}
          <div className="text-gray-500 text-sm mt-4 flex items-center gap-2">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
              </div>
            </div>
            <div>
              <p>{tour.description}</p>
            </div>
          </div>

          {/* Price + Button */}
          <div className="flex justify-between items-center mt-6 mb-4">
            <button
              className="btn btn-primary"
              onClick={() => router.push(`/tour/${tour._id}`)}
            >
              Explore
            </button>

            <div className="text-right">
              <p className="text-gray-400 text-sm">From</p>
              <p className="text-xl font-bold">
               BDT:{tour.fee} <span className="text-gray-400 line-through text-sm">10%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}