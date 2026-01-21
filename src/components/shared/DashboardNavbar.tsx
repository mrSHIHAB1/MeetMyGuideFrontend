// At the top of your page file
export const dynamic = 'force-dynamic';
import { headers } from "next/headers";

import { Menu, LogIn, UserPlus, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cookies } from "next/headers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import Image from "next/image";
import UserDropdown from "../modules/Dashboard/UserDropdown";

const DashboardNavbars = async () => {
  const currentUser = await getUserInfo();
  const accessToken = (await cookies()).get("accessToken")?.value;
  const role = currentUser?.role;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/contacts", label: "Contacts" },
    { href: "/about", label: "About" },
    { href: "/BecomeGuide", label: "Become a Guide" },
  ];

  if (accessToken && role === "ADMIN") {
    navItems.push({ href: "/admin/dashboard", label: "Dashboard" });
  }

  if (accessToken && role === "GUIDE") {
    navItems.push({ href: "/guide/dashboard", label: "Dashboard" });
  }

  if (accessToken && role === "TOURIST") {
    navItems.push({ href: "/tourist/mybookings", label: "Dashboard" });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className=" flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Brand Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Compass className="text-primary-content w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text ">
            MyGuide
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm font-semibold text-foreground/70 hover:text-primary transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {accessToken ? (
            <UserDropdown userInfo={currentUser} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="cursor-pointer  hover:text-primary hover:bg-primary/5 font-semibold gap-2 border border-transparent hover:border-primary/20 transition-all">
                  <LogIn size={18} />
                  Sign In
                </Button>
              </Link>
              <div className="h-4 w-[1px] bg-border mx-1 opacity-50" />
              <Link href="/register">
                <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-primary-content font-semibold px-6 shadow-lg shadow-primary/25 rounded-full gap-2 transform hover:scale-105 transition-all">
                  <UserPlus size={18} />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
          {accessToken && <UserDropdown userInfo={currentUser} />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-xl">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col p-0 border-l border-primary/10">
              <SheetHeader className="p-6 border-b text-left bg-primary/5">
                <SheetTitle className="flex items-center gap-2">

                  <div className="bg-blue-500 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                    <Compass className="text-primary-content w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text ">
                    MyGuide
                  </span>

                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 space-y-4 flex-grow">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between text-lg font-medium hover:text-primary transition-colors group p-2 hover:bg-primary/5 rounded-lg"
                  >
                    {link.label}
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Link>
                ))}
              </nav>
              {!accessToken && (
                <div className="p-6 border-t space-y-3 bg-primary/5">
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full cursor-pointer  justify-start gap-2 h-12 border-primary/20 hover:border-primary/50">
                      <LogIn size={18} className="text-primary" />
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="w-full justify-start gap-2 h-12 bg-blue-500 hover:bg-blue-600 cursor-pointer shadow-lg shadow-primary/20">
                      <UserPlus size={18} />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbars;
