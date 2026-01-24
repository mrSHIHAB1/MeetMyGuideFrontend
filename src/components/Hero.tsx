"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Globe, PlaneIcon, MapPin, Plane } from "lucide-react";

export const Hero = () => {
  const router = useRouter();
  return (
    <div>
      <section className="relative overflow-hidden bg-white">

        <div className="md:hidden relative h-[600px] w-full">
          {/* LCP IMAGE */}
          <Image
            src="/MyGuide.png"
            alt="Travel with Local Tour Guides around different places of the world"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[30%_center]"
          />
          <div className="absolute inset-0 bg-white/80" />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 py-12 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600 font-medium">
              <Globe className="w-4 h-4" />
              Explore the world!
            </div>
            <h1 className="text-3xl font-bold leading-snug text-gray-900">
              Travel with <span className="text-blue-500">Local Tour Guides </span> around different places of the world
            </h1>

            <p className="text-gray-700 text-base max-w-md">
              Embark on authentic journeys with experienced local guides who reveal hidden gems, cultural treasures, and unforgettable experiences across the globe. Travel like a local, wherever you go
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/explore')}
                className="cursor-pointer rounded-full bg-blue-500 px-7 py-3 text-white font-medium shadow-lg hover:bg-blue-600 transition"
              >
                Explore
              </button>

              <button
                onClick={() => router.push('/BecomeGuide')}
                className="cursor-pointer flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100 transition"
              >
                <PlaneIcon className="w-4 h-4" />
                Become a Guide
              </button>
            </div>

          </div>
        </div>

        <div className="hidden md:block">
          <div className="container mx-auto px-8 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-600 font-medium">
                  <Globe className="w-4 h-4" />
                  Explore the world!
                </div>

                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                  Travel with <span className="text-blue-500">Local Tour Guides </span> around different places of the world
                </h1>

                <p className="max-w-xl text-gray-600 text-lg">
                  Embark on authentic journeys with experienced local guides who reveal hidden gems, cultural treasures, and unforgettable experiences across the globe. Travel like a local, wherever you go
                </p>

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

              {/* RIGHT IMAGE STACK */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative flex gap-6">

                  {/* LEFT STACK */}
                  <div className="flex md:flex-col gap-6">
                    <div className="relative h-72 w-56 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/hero-11.png"
                        alt="City travel"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute bottom-2 left-2 bg-white p-3 rounded-full shadow-md">
                        <Plane className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>

                    <div className="relative h-72 w-56 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/MyGuide.png"
                        alt="Luxury pool"
                        fill
                        className="object-cover object-[30%_center]"
                        priority
                      />
                    </div>
                  </div>

                  {/* RIGHT TALL IMAGE */}
                  <div className="relative h-[520px] w-64 rounded-2xl overflow-hidden shadow-xl mt-10">
                    <Image
                      src="/hero-33.png"
                      alt="Island beach"
                      fill
                      className="object-cover"
                      priority
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
        </div>

      </section>
    </div>
  );
};
