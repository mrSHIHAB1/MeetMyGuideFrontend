import React from "react";

export default function PackageSection() {
    const plans = [
        {
            title: "Half Board",
            price: 50,
            tag: null,
            bg: "bg-gray-100",
            text: "text-gray-900",
            btn: "View Trips",
        },
        {
            title: "All Inclusive",
            price: 32,
            tag: null,
            bg: "bg-[#5D5FEF] text-white",
            text: "text-white",
            btn: "View All",
        },
        {
            title: "Excursions Included",
            price: 68,
            tag: "POPULAR",
            bg: "bg-gray-800 text-white",
            text: "text-white",
            btn: "Button",
        },
    ];

    const features = [
        "Transfers from Airport",
        "Minimum 3 Star Hotel",
        "Alcoholic beverages",
        "Incl. Museum Tickets",
        "Meals in Restaurants",
    ];

    return (
        <div className="min-h-screen flex justify-center items-center p-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`${plan.bg} rounded-2xl p-8 shadow-xl relative flex flex-col items-center`}
                    >
                        {plan.tag && (
                            <span className="absolute top-4 right-4 bg-indigo-400 text-white text-xs px-3 py-1 rounded-full">
                                {plan.tag}
                            </span>
                        )}

                        <h3 className={`text-lg font-semibold mb-4 ${plan.text}`}>{plan.title}</h3>

                        <div className="text-5xl font-bold mb-2">${plan.price}</div>
                        <p className="text-sm mb-6">/Day</p>

                        <ul className="text-sm space-y-1 mb-6 text-center">
                            {features.map((f, idx) => (
                                <li key={idx}>{f}</li>
                            ))}
                        </ul>

                        <button className="bg-white text-black rounded-lg px-4 py-2 font-medium shadow">
                            {plan.btn}
                        </button>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 text-center absolute bottom-6 w-full">
                * All trips include medical insurance
            </p>
        </div>
    );
}
