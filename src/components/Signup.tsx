"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Metadata } from "next";
import { register } from "@/services/auth/createUser";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Phone,
  Image as ImageIcon,
  MapPin,
  FileText,
  DollarSign,
  Languages,
  Briefcase,
  ChevronRight,
  Star
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
};

const Signup = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(register, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Requested successfully! Please wait for approval.");
      setTimeout(() => router.push("/login"), 1500);
    } else if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <section className="min-h-screen bg-gray-50/50 py-6 sm:py-8 md:py-12 lg:py-20 px-3 sm:px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
          {/* Left Column - Hero/Info */}
          <div className="md:w-1/3 bg-blue-600 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Join Our Guide Network</h2>
              <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8">
                Share your expertise, lead amazing tours, and grow your career with our platform.
              </p>

              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex items-center gap-3">
                  <div className="bg-blue-500/50 p-2 rounded-lg">
                    <Star className="w-4 h-4" />
                  </div>
                  Verified Profile
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-500/50 p-2 rounded-lg">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  Competitive Rates
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-500/50 p-2 rounded-lg">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  Flexible Schedule
                </li>
              </ul>
            </div>

            {/* Background Decoration */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          </div>

          {/* Right Column - Form */}
          <div className="md:flex-1 p-6 sm:p-8 lg:p-12">
            <div className="mb-8 sm:mb-10 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Request Guide Account</h3>
              <p className="text-sm sm:text-base text-gray-500">Fill in your details to start your journey with us.</p>
            </div>

            <form action={formAction} encType="multipart/form-data" className="space-y-5 sm:space-y-6">
              {/* Personal Information Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="col-span-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Profile Picture</label>
                  <div className="relative group">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 file:mr-2 sm:file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all shadow-none"
                      required
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Physical Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Street, City, Country"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Professional details Group */}
              <div className="space-y-4 sm:space-y-5 pt-4 sm:pt-6 border-t border-gray-100">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">Professional Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="col-span-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Brief Bio</label>
                    <div className="relative group">
                      <FileText className="absolute left-3 top-4 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <textarea
                        name="bio"
                        placeholder="Tell us about yourself and your guiding experience..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[80px] sm:min-h-[100px] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Daily Rate (BDT)</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="number"
                        name="dailyrate"
                        placeholder="1500"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Spoken Languages</label>
                    <div className="relative group">
                      <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="spokenLanguages"
                        placeholder="English, Spanish..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">Areas of Expertise</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        name="expertise"
                        placeholder="History, Culture, Trekking..."
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 sm:pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Send Request <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
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

export default Signup;
