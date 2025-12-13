"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const BookingCard = ({
    data,
    user
}: {
    data: any[];
    user: any;
}) => {

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("UPCOMING");

    // 🔹 Filter based on bookingStatus
    const upcoming = data.filter((x) => x.bookingStatus === "PENDING" || x.bookingStatus === "CONFIRMED");
    const past = data.filter((x) => x.bookingStatus === "COMPLETED");
    const wishlist = data.filter((x) => x.isBookmarked);
    const dataMap: Record<string, any[]> = {
        UPCOMING: upcoming,
        PAST: past,
        WISHLIST: wishlist
    };

    return (
        <div className="flex w-full min-h-screen bg-gray-50 p-6 gap-6">

            {/* Sidebar */}
            <aside className="w-72 bg-white shadow rounded-2xl p-6 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                    <Image
                        src={user?.picture || "/broken.png"}
                        alt="User profile"
                        width={120}
                        height={120}
                    />
                </div>

                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.phone}</p>
                <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

                <button className="border px-4 py-2 rounded-lg text-sm w-full mb-6">
                    EDIT PROFILE
                </button>

                <button className="mt-auto border px-4 py-2 rounded-lg text-sm text-red-500 border-red-300 w-full">
                    LOGOUT ↪
                </button>
            </aside>

            {/* Right Section */}
            <main className="flex-1 bg-white shadow rounded-2xl p-6">
                {/* Tabs */}
                <div className="flex gap-10 border-b pb-3 mb-6 font-medium text-gray-600">
                    {["UPCOMING", "PAST", "WISHLIST"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 ${activeTab === tab
                                ? "text-black border-b-2 border-black"
                                : "text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-6">
                    {dataMap[activeTab].map((item, index) => (
                        <div key={index} className="flex bg-white border rounded-xl p-4 shadow-sm gap-4">

                            <div className="w-40 h-28 rounded-lg overflow-hidden">
                                <img src={item.images?.[0] || "/no-image.jpg"} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex justify-between w-full">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.destination}</p>

                                    <p className="mt-3 text-sm">
                                        {item.duration} Hours •{" "}
                                        <span className="font-medium text-blue-600">
                                            {item.bookingStatus}
                                        </span>
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                        Requested: {item.requestedDate || "N/A"}
                                    </p>
                                </div>

                                <div className="text-right flex flex-col justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">Tour Fee</p>
                                        <p className="font-semibold text-lg">{item.fee} BDT</p>
                                    </div>

                                    {item.status === "PENDING"  &&(
                                        <button className="text-sm text-blue-600 hover:underline">
                                            Pay Now
                                        </button>
                                    )}

<button
            onClick={() => {
              if(activeTab === "WISHLIST"){
                router.push(`/tour/${item.tourId}`); // redirect to tour details page
              } else {
                router.push(`/bookings/${item.bookingId}`); // existing booking details
              }
            }}
            className="text-sm text-gray-600 hover:underline"
          >
            VIEW MORE
          </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
