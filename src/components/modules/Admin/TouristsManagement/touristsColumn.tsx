"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITourist } from "@/types/tourist.interface";

export const touristsColumns: Column<ITourist>[] = [
    {
        header: "Tourist",
        accessor: (tourist) => (
            <UserInfoCell
                name={tourist.name}
                email={tourist.email}
                photo={tourist.profilePhoto}
            />
        ),
        sortKey: "name",
    },
    {
        header: "Contact",
        accessor: (tourist) => (
            <div className="flex flex-col">
                <span className="text-sm">{tourist.contactNumber}</span>
            </div>
        ),
    },
    {
        header: "Status",
        accessor: (tourist) => <StatusBadgeCell isDeleted={tourist.isDeleted} />,
    },
    {
        header: "Joined",
        accessor: (tourist) => <DateCell date={tourist.createdAt} />,
        sortKey: "createdAt",
    },
];
