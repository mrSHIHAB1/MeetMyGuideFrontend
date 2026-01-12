"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState, useTransition } from "react";
import { useActionState } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";

const SigninPage = ({ redirect }: { redirect?: string }) => {
  const [state, formAction] = useActionState(loginUser, null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
      setIsLoading(false);
    }
    if (state && state.success) {
      setIsLoading(false);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  const fillLoginForm = (email: string, password: string) => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;
      toast.success(`Credentials filled for ${email.split('@')[0]}`);
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-16 md:pb-20 lg:pb-28 lg:pt-[10px]">
        <div className="container mx-auto ">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 ">
              <div className="shadow-xl rounded-xl mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px] border border-gray-100">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Login to your account for a faster checkout.
                </p>

                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>

                <form onSubmit={handleSubmit}>
                  {redirect && <input type="hidden" name="redirect" value={redirect} />}

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Your Email
                    </label>
                    <div className="relative group">
                      {/* Optional icon */}
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Email"
                        disabled={isLoading}
                        required
                        className="
        w-full pl-10 pr-4 py-3 rounded-xl 
        bg-gray-50 dark:bg-[#2C303B] 
        border border-gray-200 dark:border-transparent 
        text-gray-700 dark:text-gray-200 
        outline-none 
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
        hover:border-gray-300
        transition-all duration-300
        selection:bg-blue-500 selection:text-white
        disabled:opacity-50 disabled:cursor-not-allowed
      "
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Your Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        disabled={isLoading}
                        required
                        className="
        w-full pl-10 pr-4 py-3 rounded-xl 
        bg-gray-50 dark:bg-[#2C303B] 
        border border-gray-200 dark:border-transparent 
        text-gray-700 dark:text-gray-200 
        outline-none 
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
        hover:border-gray-300
        transition-all duration-300
        selection:bg-blue-500 selection:text-white
        disabled:opacity-50 disabled:cursor-not-allowed
      "
                      />
                    </div>
                  </div>


                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            disabled={isLoading}
                            className="sr-only"
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Keep me signed in
                      </label>
                    </div>

                  </div>

                  <div className="mb-6">
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>Sign in</span>
                      )}
                    </Button>
                  </div>

                  {/* Quick Login Buttons */}
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-dark text-gray-500">Quick Login</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => fillLoginForm('rasel@gmail.com', 'Test123@')}
                        disabled={isLoading}
                        className="flex flex-col items-center justify-center px-3 py-3 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-6 h-6 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">Tourist</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fillLoginForm('rahim.guide@example.com', 'Test123@')}
                        disabled={isLoading}
                        className="flex flex-col items-center justify-center px-3 py-3 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-6 h-6 text-green-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">Guide</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fillLoginForm('admin@gmail.com', 'Test123@')}
                        disabled={isLoading}
                        className="flex flex-col items-center justify-center px-3 py-3 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg className="w-6 h-6 text-purple-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-700">Admin</span>
                      </button>
                    </div>
                  </div>
                </form>

                <p className="text-center text-base font-medium text-body-color">
                  Don't you have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SigninPage;