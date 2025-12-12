import React from "react";

export default function PackageSection() {
   
    return (<> <p className="text-6xl text-center font-semibold">Packages</p>
        <div className="my-10 flex justify-center items-center p-8 bg-slate-50 relative">
           
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
      
            {[
              {
                title: "Local Guide",
                price: 1500,
                tag: null,
                bg: "bg-white",
                text: "text-gray-900",
                btn: "Find Local Guide",
                features: [
                  "City-level guidance",
                  "Local language support",
                  "4–6 hours per day",
                  "Basic route planning",
                ],
              },
              {
                title: "Professional Guide",
                price: 3000,
                tag: "Most Popular",
                bg: "bg-indigo-600",
                text: "text-white",
                btn: "Find Pro Guide",
                features: [
                  "Licensed tour guide",
                  "English + Local language",
                  "8 hours full-day support",
                  "Customized itinerary",
                  "Food & attraction tips",
                ],
              },
              {
                title: "Expert Guide",
                price: 5000,
                tag: "Premium",
                bg: "bg-white",
                text: "text-gray-900",
                btn: "Find Expert Guide",
                features: [
                  "10+ years experience",
                  "Multi-language support",
                  "Full-day & night support",
                  "Photography assistance",
                  "Emergency & safety support",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`${plan.bg} rounded-2xl p-8 shadow-xl relative flex flex-col items-center ${
                  plan.bg === "bg-indigo-600" ? "scale-105" : ""
                }`}
              >
                {plan.tag && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                    {plan.tag}
                  </span>
                )}
      
                <h3 className={`text-xl font-semibold mb-4 ${plan.text}`}>
                  {plan.title}
                </h3>
      
                <div className={`text-5xl font-bold mb-1 ${plan.text}`}>
                  ৳{plan.price}
                </div>
                <p className={`text-sm mb-6 ${plan.text}`}>per day</p>
      
                <ul
                  className={`text-sm space-y-2 mb-8 text-center ${
                    plan.bg === "bg-indigo-600" ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {plan.features.map((f, idx) => (
                    <li key={idx}>✔ {f}</li>
                  ))}
                </ul>
      
                <button
                  className={`rounded-lg px-6 py-3 font-medium transition ${
                    plan.bg === "bg-indigo-600"
                      ? "bg-white text-indigo-600 hover:bg-gray-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {plan.btn}
                </button>
              </div>
            ))}
          </div>
      
          <p className="text-xs text-gray-500 text-center absolute bottom-6 w-full">
            * Prices are per guide per day. Travel expenses not included.
          </p>
        </div>
        </>
      );
      
}
