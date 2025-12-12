import { TourCard } from "../TourCard";

export default function Featured({tour}:{tour:any}) {
    const chunkArray = (arr: any[], size: number) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
          result.push(arr.slice(i, i + size));
        }
        return result;
      };
    
      const tourChunks = chunkArray(tour, 4);
      console.log(tourChunks)
    return (
        <div>
      <section className="w-full bg-white py-20 px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center relative">
  
          {/* Background Map */}
          <div className="absolute right-0 top-0 w-full h-full pointer-events-none opacity-10 hidden lg:block">
            
          </div>
  
          {/* Left Content */}
          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Plan the Trip of a Lifetime <br /> with Ease
            </h1>
  
            <p className="text-gray-600 leading-relaxed max-w-md">
              Whether you're looking for a romantic getaway, a family-friendly adventure,
              or a solo journey to explore the world, a travel agency can provide you
              with a custom-tailored itinerary that exceeds your expectations.
            </p>
  
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
              More Info
            </button>
          </div>
  
          {/* Right Cards */}
          <div className="relative z-10 grid md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition">
              <img src="/road.png" className="h-40 w-full object-cover" />
              <div className="p-4 bg-white flex items-center gap-2">
                <span className="text-yellow-500 text-xl">📍</span>
                <p className="font-semibold">City Walks Tour</p>
              </div>
            </div>
  
            {/* Card 2 */}
            <div className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition">
              <img src="/mountain.png" className="h-40 w-full object-cover" />
              <div className="p-4 bg-white flex items-center gap-2">
                <span className="text-green-600 text-xl">⛰️</span>
                <p className="font-semibold">Mountains</p>
              </div>
            </div>
  
            {/* Card 3 */}
            <div className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition">
              <img src="/skyscrapper.png" className="h-40 w-full object-cover" />
              <div className="p-4 bg-white flex items-center gap-2">
                <span className="text-blue-500 text-xl">🌆</span>
                <p className="font-semibold">Skyscrapers View</p>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  
</div>

      </div>
    );
  }
  