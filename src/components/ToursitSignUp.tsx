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

import {
  User,
  Mail,
  Lock,
  Phone,
  Image as ImageIcon,
  MapPin,
  FileText,
  Languages,
  Heart,
  ChevronRight,
  Globe,
  Compass
} from "lucide-react";

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
    <section className="min-h-screen bg-gray-50/50 py-12 md:py-20 lg:py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left Column - Hero/Info */}


          {/* Right Column - Form */}
          <div className="md:flex-1 p-8 lg:p-12">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Tourist Account</h3>
              <p className="text-gray-500">Join our community of travelers today.</p>
            </div>

            <form action={formAction} encType="multipart/form-data" className="space-y-6">
              {/* Personal Information Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Profile Picture</label>
                  <div className="relative group">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all shadow-none"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Dhaka, Bangladesh"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Travel Preferences Group */}
              <div className="space-y-5 pt-4 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">Preferences & Bio</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Tell Us About Yourself</label>
                    <div className="relative group">
                      <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <textarea
                        name="bio"
                        placeholder="Share your interests, travel history, or what you're looking for..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[100px] transition-all resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Spoken Languages</label>
                    <div className="relative group">
                      <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="spokenLanguages"
                        placeholder="English, Spanish, French"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Travel Preferences</label>
                    <div className="relative group">
                      <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="travelpreferences"
                        placeholder="Adventure, Food, Culture"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Create Account <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-bold hover:underline underline-offset-4 transition-all">
                  Sign in here
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
