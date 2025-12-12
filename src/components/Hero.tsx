"use client";

import { useRouter } from "next/navigation";


export const Hero = () => {
  const router=useRouter();
  return (
    <div>
      <div
        className="hero min-h-[500px]"
        style={{
          backgroundImage: `url(/bgimg.png)`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Discover Your Next Adventure</h1>
            <p className="mb-5">
              Explore the world's most beautiful destinations with ease. Find unique experiences, plan your trips, and make memories that last a lifetime.

            </p>
            <button onClick={()=>router.push('/explore')} className="btn btn-primary rounded-xl">Explore Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
