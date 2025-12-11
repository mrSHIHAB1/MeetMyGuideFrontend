"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const BookingCard = ({ tours, user }: { tours: any; user: any }) => {
    const [activeTab, setActiveTab] = useState("UPCOMING");
    const router = useRouter();

    const upcoming = tours.filter((t: any) => t.status === "PENDING");
    const past = tours.filter((t: any) => t.status === "COMPLETED");
    const wishlist = [{}

    ];

    console.log(tours)
    const dataMap: Record<string, any[]> = {
        UPCOMING: upcoming,
        PAST: past,
        WISHLIST: wishlist,

    };
    console.log("this is booking", tours)
    //   const handlePay = async () => {
    //     const res = await fetch("http://localhost:5000/api/v1/payment/checkout-session", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         "amount": tour.fee * 100,
    //         "currency": "bdt",
    //         "bookingId": booking._id,
    //         "tourId": tour._id

    //       }),
    //     });
    //     const session = await res.json();
    //     console.log(session)
    //     router.push(session.data.checkoutUrl);
    //   }

    return (
        <div>
            <div className="flex w-full min-h-screen bg-gray-50 p-6 gap-6">
                {/* Sidebar */}
                <aside className="w-72 bg-white shadow rounded-2xl p-6 flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
                        <Image
                            src={user?.picture || "/broken.png"}
                            alt="User profile"
                            width={10}
                            height={10}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="text-lg font-semibold">{user?.name}</h2>
                    <p className="text-sm text-gray-600">{user?.phone}</p>
                    <p className="text-sm text-gray-600 mb-4">{user?.email}</p>

                    <button className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 w-full mb-6">
                        EDIT PROFILE
                    </button>



                    <button className="mt-auto border px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 text-red-500 border-red-300 w-full flex items-center justify-center gap-2">
                        LOGOUT <span>↪</span>
                    </button>
                </aside>

                {/* Right Content */}
                <main className="flex-1 bg-white shadow rounded-2xl p-6">
                    {/* Tabs */}
                    <div className="flex gap-10 border-b pb-3 mb-6 font-medium text-gray-600">
                        {["UPCOMING", "PAST", "WISHLIST"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 transition ${activeTab === tab
                                    ? "text-black border-b-2 border-black"
                                    : "text-gray-500 hover:text-black"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Booking Cards */}
                    <div className="flex flex-col gap-6">
                        {dataMap[activeTab].map((item, index) => (
                            <div
                                key={index}
                                className="flex bg-white border rounded-xl p-4 shadow-sm gap-4"
                            >
                                <div className="w-40 h-28 rounded-lg overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt="Resort image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex justify-between w-full">
                                    <div>
                                        <h3 className="font-semibold text-lg">Nieve Resort</h3>
                                        <p className="text-gray-600 text-sm">Wayanad, Kerala</p>

                                        <p className="mt-3 text-sm">
                                            {item.guests} • {item.rooms} •{" "}
                                            <span className={`${item.statusColor} font-medium`}>
                                                {item.status}
                                            </span>
                                        </p>

                                        <p className="text-gray-500 text-sm">{item.createdAt}</p>
                                    </div>

                                    <div className="text-right flex flex-col justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">{item.priceTitle}</p>
                                            <p className="font-semibold text-lg">{item.price}</p>
                                        </div>

                                        <button
                                            onClick={() => router.push(`/bookings/${item._id}`)}
                                            className="text-sm font-medium text-gray-600 hover:underline">
                                            VIEW MORE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
