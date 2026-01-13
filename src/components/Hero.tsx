"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Play, Globe, Plane, MapPin, User, PlaneIcon } from "lucide-react";


export const Hero = () => {
  const router = useRouter();
  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-8 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600 font-medium">
                <Globe className="w-4 h-4" />
                Explore the world!
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                Travel <span className="text-blue-500">top destination</span> of
                the world
              </h1>

              {/* Description */}
              <p className="max-w-xl text-gray-600 text-lg">
                Immerse yourself in a world of wanderlust with our curated travel
                experiences. From breathtaking landscapes to cultural gems,
                embark on unforgettable adventures.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button onClick={() => router.push('/explore')} className="cursor-pointer rounded-full bg-blue-500 px-7 py-3 text-white font-medium shadow-lg hover:bg-blue-600 transition">
                  Explore
                </button>

                <button onClick={() => router.push('/BecomeGuide')} className="cursor-pointer flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100 transition">
                  <PlaneIcon className="w-4 h-4" />
                  Become a Guide
                </button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative flex gap-6">

                {/* LEFT STACK */}
                <div className="flex md:flex-col gap-6">
                  {/* Image 1 */}
                  <div className="relative h-72 w-56 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/hero-11.png"
                      alt="City travel"
                      fill
                      className="object-cover"
                    />

                    {/* Plane Icon */}
                    <div className="absolute bottom-2 left-2 bg-white p-3 rounded-full shadow-md">
                      <Plane className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>

                  {/* Image 2 */}
                  <div className="relative h-72 w-56 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/hero-2.png"
                      alt="Luxury pool"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* RIGHT TALL IMAGE */}
                <div className="hidden md:block relative h-[520px] w-64 rounded-2xl overflow-hidden shadow-xl mt-10">
                  <Image
                    src="/hero-33.png"
                    alt="Island beach"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">Top Places</span>
                  </div>
                </div>



              </div>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
};
