'use client';

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Metadata } from "next";
import { registertourist } from "@/services/tourist/touristManagement";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Tourist Sign Up | Local Guide Platform",
  description: "Sign up as a tourist to explore guided tours.",
};

const TouristSignup = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(registertourist, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Account created successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <section className="relative z-10 overflow-hidden py-5 bg-gray-50">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="shadow-xl rounded-3xl bg-white dark:bg-gray-800 p-8 sm:p-10">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Create Your Account
            </h3>
          

            <form action={formAction} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="01234..."
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                 
                 <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    placeholder="Write something about yourself..."
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
               

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Dhaka, Bangladesh"
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Spoken Languages
                  </label>
                  <input
                    type="text"
                    name="spokenLanguages"
                    placeholder="English, Spanish, French"
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Travel Preferences
                  </label>
                  <input
                    type="text"
                    name="travelpreferences"
                    placeholder="Adventure, Food, Culture"
                    className="w-full px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    className="w-full text-gray-500 dark:text-gray-300  px-4 py-3  border border-gray-300 dark:border-gray-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Full width Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3  bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-center text-gray-500 dark:text-gray-300 mt-6 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristSignup;
