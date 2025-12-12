import ExploreTourFilter from "../modules/tourist/Exploretourfilter";

export default function PublicDashBoard() {
  return (
    <div className="hidden p-5 md:flex h-full w-74 flex-col border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <p className="text-center font-bold mb-5">Search Filters</p>
      <ExploreTourFilter></ExploreTourFilter>


    </div>

  )
}