"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icon-mapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-72 flex-col border-r border-gray-200 bg-white shadow-lg">
      {/* Logo / Brand */}
      {/* <div className="flex h-16 items-center border-b border-gray-200 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <Link href={dashboardHome} className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-wider">MeetMyGuide</span>
        </Link>
      </div> */}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-6">
        <nav className="">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">

                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-white" : "text-gray-500")} />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "default"}
                          className="ml-auto"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info at Bottom */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-t-xl mt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center shadow">
            <span className="text-white font-bold">{userInfo.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{userInfo.name}</p>
            <p className="text-xs text-gray-500 capitalize">{userInfo.role.toLowerCase()}</p>
          </div>
          <button className="ml-2 px-3 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
