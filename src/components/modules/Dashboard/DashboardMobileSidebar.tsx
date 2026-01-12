"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icon-mapper";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardMobileSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardMobileSidebar = ({
  userInfo,
  navItems,
}: DashboardMobileSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>



      {/* Navigation (ONLY SCROLL HERE) */}
      <ScrollArea className="flex-1 px-3 py-4 no-scrollbar">
        <nav className="space-y-6">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
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
                          : "text-blue-100 hover:bg-blue-500/30 hover:text-white"
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

              {sectionIdx < navItems.length - 1 && (
                <Separator className="my-4 bg-blue-500/40" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>



    </div>
  );
};

export default DashboardMobileSidebar;
