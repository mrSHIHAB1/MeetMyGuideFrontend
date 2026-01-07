'use client';

import { IGuide } from "@/types/guide.interface";
import { Star } from "lucide-react";

const guides = [
  {
    id: 1,
    name: "Rahim Uddin",
    username: "@rahimguide",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    rating: 4.8,
    toursCompleted: 128,
  },
  {
    id: 2,
    name: "Ayesha Khan",
    username: "@ayeshakhan",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    rating: 4.9,
    toursCompleted: 156,
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    username: "@tanvirh",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    rating: 4.6,
    toursCompleted: 98,
  },
];
interface FeaturedGuides {
  data:IGuide;
  totalReviews: number;
  averageRating:number;
 }
export default function SeamlessCarousel({ guides}: { guides: FeaturedGuides[] } ) {

  

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Meet Our Tour Guides
        </h2>
      </div>

      <div className="relative">
        <div
       
          className="flex gap-6 overflow-x-auto scrollbar-hide"
         
        >
          {guides.map((guide) => (
            <div
              key={guide.data._id}
              className="relative w-[280px] flex-shrink-0"
              style={{ userSelect: 'none' }}
            >
              {/* Card Container */}
              <div className="bg-gray-100 rounded-3xl p-5 pb-4 shadow-lg">
                {/* Name */}
                <div className="mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 mb-0.5">
                    {guide.data.name}
                  </h3>
                </div>

                {/* Profile Image */}
                <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-4">
                  <img
                    src={guide.data.picture ?? ""}
                    alt={guide.data.name}
                    className="w-full h-full object-cover object-center pointer-events-none"
                    draggable="false"
                  />
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                  {/* User Info */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={guide.data.picture ?? ""}
                        alt={guide.data.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600">
                        {guide.data.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-semibold text-gray-700">
                            {guide.averageRating}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {guide.totalReviews} tours
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-medium">
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