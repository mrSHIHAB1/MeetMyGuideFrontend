export default function PublicDashBoard(){
    return(
        <div className="hidden md:flex h-full w-84 flex-col border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">

 
  {/* Navigation */}
  <div className="flex-1 px-4 py-5 overflow-y-auto">
    <nav className="space-y-6">

      {/* Section 1 */}
      <div className="space-y-2">
        <h4 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Main
        </h4>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm bg-primary text-primary-foreground shadow-sm"
        >
          <span className="h-4 w-4 bg-white/40 rounded"></span>
          Dashboard
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="h-4 w-4 bg-gray-300 rounded"></span>
          Explore Tours
        </a>
      </div>

      <div className="border-t my-4 opacity-50"></div>

      {/* Section 2 */}
      <div className="space-y-2">
        <h4 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Management
        </h4>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="h-4 w-4 bg-gray-300 rounded"></span>
          Users
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="h-4 w-4 bg-gray-300 rounded"></span>
          All Tours
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="h-4 w-4 bg-gray-300 rounded"></span>
          Create Tour
        </a>
      </div>

      <div className="border-t my-4 opacity-50"></div>

      {/* Section 3 */}
      <div className="space-y-2">
        <h4 className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Settings
        </h4>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="h-4 w-4 bg-gray-300 rounded"></span>
          Profile
        </a>

        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
        >
          <span className="h-4 w-4 bg-gray-300 rounded"></span>
          Logout
        </a>
      </div>

    </nav>
  </div>

  {/* User Info Bottom */}
  <div className="border-t p-4 bg-white/70 backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-sm font-semibold text-primary">S</span>
      </div>

      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium truncate">Shihab Rahman</p>
        <p className="text-xs text-muted-foreground truncate">admin</p>
      </div>
    </div>
  </div>

</div>

    )
}