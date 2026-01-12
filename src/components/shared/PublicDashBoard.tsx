import ExploreTourFilter from "../modules/tourist/Exploretourfilter";

export default function PublicDashBoard() {
  return (
    <div className="hidden md:flex sticky top-0 h-screen w-74 flex-col border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 overflow-y-auto p-5">
      <p className="text-center font-bold mb-5">Search </p>
      <ExploreTourFilter></ExploreTourFilter>


    </div>

  )
}