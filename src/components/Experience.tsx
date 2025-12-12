import React from "react";

export default function ExperienceSharing() {
    return (
        <div className="w-full max-h-screen bg-gradient-to-br from-gray-300 to-gray-100 p-12 flex flex-col gap-12">

            {/* Header */}
            <div className="max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Unforgettable Travel <br /> Experiences
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed">
                    Our customer's feedback is essential in building a great reputation
                    and maintaining excellent service. By listening to our customer's
                    needs, we can improve our offerings and provide an exceptional travel
                    experience.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">

                {/* Card 1 */}
                <div className="bg-indigo-500 text-white p-8 rounded-2xl shadow-xl">
                    <p className="text-sm leading-relaxed mb-6">
                        My husband and I have been using this travel agency for years and
                        they have never disappointed us.
                    </p>

                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="avatar"
                            className="w-10 h-10 rounded-full border border-white"
                        />
                        <div>
                            <p className="text-xs font-semibold">Jennifer and Mark</p>
                            <p className="text-[10px] opacity-80">San Francisco</p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-indigo-500 text-white p-8 rounded-2xl shadow-xl">
                    <p className="text-sm leading-relaxed mb-6">
                        This travel agency made my dream trip to Europe a reality. They
                        worked with me every step of the way to plan the itinerary.
                    </p>

                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40?img=30"
                            alt="avatar"
                            className="w-10 h-10 rounded-full border border-white"
                        />
                        <div>
                            <p className="text-xs font-semibold">Dylan and Emily</p>
                            <p className="text-[10px] opacity-80">Miami</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
