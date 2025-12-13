"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Metadata } from "next";
import { register } from "@/services/auth/createUser";
import { useRouter } from "next/navigation";
import { registertourist } from "@/services/tourist/touristManagement";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
};

const TouristSignup= () => {
  const router = useRouter();
  const [state, formAction] = useActionState(registertourist, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Account created successfully!");
      setTimeout(() => router.push("/login"), 1500); // redirect after 1.5s
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Create your account
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                
              </p>

              
              <div className="mb-8 flex items-center justify-center">
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                
                <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
              </div>

              {/* Form */}
              <form action={formAction} encType="multipart/form-data">
                <div className="mb-8">
                  <label className="mb-3 block text-sm text-dark dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-3 block text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input-field"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-3 block text-sm">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="input-field"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-3 block text-sm">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="01234..."
                    className="input-field"
                  />
                </div>
                <div className="mb-8">
  <label className="mb-3 block text-sm">Profile Picture</label>
  <input
    type="file"
    name="file"
    accept="image/*"
    className="input-field"
  />
</div>

                <div className="mb-8">
                  <label className="mb-3 block text-sm">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Dhaka, Bangladesh"
                    className="input-field"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-3 block text-sm">Bio</label>
                  <textarea
                    name="bio"
                    placeholder="Write something about yourself"
                    className="input-field"
                  />
                </div>


                <div className="mb-8">
                  <label className="mb-3 block text-sm">
                    Spoken Languages (comma separated)
                  </label>
                  <input
                    type="text"
                    name="spokenLanguages"
                    placeholder="English, Spanish, French"
                    className="input-field"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-3 block text-sm">
                  travelpreferences(comma separated)
                  </label>
                  <input
                    type="text"
                    name="travelpreferences"
                    placeholder="travelpreferences"
                    className="input-field"
                  />
                </div>

                <div className="mb-6">
                  <button className="shadow-submit w-full rounded-sm bg-primary px-9 py-4 text-white">
                    Sign up
                  </button>
                </div>
              </form>

              <p className="text-center text-base font-medium text-body-color">
                Already using Startup?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristSignup;
