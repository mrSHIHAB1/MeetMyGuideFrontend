""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";


export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["TOURIST", "GUIDE", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["TOURIST"],
                },
            ],
        },
    ]
}

export const GUIDENavItems: NavSection[] = [
    {
        title: "TOURIST Management",
        items: [
            {
                title: "Tours",
                href: "/guide/dashboard/tours-management",
                icon: "Calendar", 
                badge: "3",
                roles: ["GUIDE"],
            },
            {
                title: "My Schedules",
                href: "/guide/dashboard/my-schedules",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"],
            },
            {
                title: "Prescriptions",
                href: "/guide/dashboard/prescriptions",
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
                href: "/dashboard/my-tours",
                icon: "Calendar", 
                roles: ["TOURIST"],
            },
            {
                title: "Book Appointment",
                href: "/consultation",
                icon: "ClipboardList", 
                roles: ["TOURIST"],
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText", 
                roles: ["TOURIST"],
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity", 
                roles: ["TOURIST"],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", 
                roles: ["ADMIN"],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "Stethoscope", 
                roles: ["ADMIN"],
            },
            {
                title: "Tourists",
                href: "/admin/dashboard/tourists-management",
                icon: "Users", 
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
            {
                title: "Specialities",
                href: "/admin/dashboard/specialities-management",
                icon: "Hospital", 
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...GUIDENavItems];
        case "TOURIST":
            return [...commonNavItems, ...TOURISTNavItems];
        default:
            return [];
    }
}