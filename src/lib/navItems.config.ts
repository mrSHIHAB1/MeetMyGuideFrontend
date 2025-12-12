""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
              
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                {
                    title: "Settings",
                    href:"#",
                    icon: "Settings",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                

            ]
        },

    ]
}

export const GUIDENavItems: NavSection[] = [
    {
        title: "TOURIST Management",
        items: [


            {
                title: "My Listing",
                href: "/guide/dashboard/my-listing",
                icon: "Calendar",
             
                roles: ["GUIDE"],
            },
            {
                title: "Upcoming Booking",
                href: "/guide/dashboard/upcomming-booking",
                icon: "Clock",
                roles: ["GUIDE"],
            },
            {
                title: "Pending Requests",
                href: "/guide/dashboard/pending-requests",
                icon: "FileText",
                roles: ["GUIDE"],
            },
        ],
    }
]

export const TOURISTNavItems: NavSection[] = [
    {
        title: "Manage Tours",
        items: [
            {
                title: "Tours",
                href: "/tourist/dashboard/my-tours",
                icon: "Calendar",
                roles: ["TOURIST"],
            },
            {
                title: "Bookings",
                href: "/tourist/dashboard/bookings",
                icon: "ClipboardList",
                roles: ["TOURIST"],
            },
        ],
    }


]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "ShieldUser",
                roles: ["ADMIN"],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "User",
                roles: ["ADMIN"],
            },
            {
                title: "Tourists",
                href: "/admin/dashboard/tourists-management",
                icon: "UsersRound",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Manage Listing",
        items: [
            {
                title: "Tours",
                href: "/admin/dashboard/tours-management",
                icon: "Calendar",
                roles: ["ADMIN"],
            },
            {
                title: "Bookings",
                href: "/admin/dashboard/bookings-management",
                icon: "Clock",
                roles: ["ADMIN"],
            },

        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...adminNavItems, ...commonNavItems];
        case "GUIDE":
            return [...GUIDENavItems, ...commonNavItems];
        case "TOURIST":
            return [...commonNavItems, ...TOURISTNavItems];
        default:
            return [];
    }
}