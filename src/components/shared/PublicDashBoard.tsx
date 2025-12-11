import ExploreTourFilter from "../modules/tourist/Exploretourfilter";

export default function PublicDashBoard() {
  return (
    <div className="hidden md:flex h-full w-84 flex-col border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <ExploreTourFilter></ExploreTourFilter>


    </div>

  )
}