"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icon-mapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import LogoutButton from "@/components/shared/LogoutButton";

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
    <div className="hidden md:flex sticky top-16 h-[calc(100vh-64px)] w-72 flex-col bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg overflow-y-auto">
      {/* Logo / Brand */}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-6">
        <nav>
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-4">
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-blue-200">
                  {section.title}
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
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md text-white"
                          : "text-blue-100 hover:bg-blue-500 hover:bg-opacity-30 hover:text-white"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          isActive ? "text-white" : "text-blue-200"
                        )}
                      />
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
      <div className="p-4 mt-4">

        <LogoutButton />

      </div>
    </div>
  );
};

export default DashboardSidebarContent;
