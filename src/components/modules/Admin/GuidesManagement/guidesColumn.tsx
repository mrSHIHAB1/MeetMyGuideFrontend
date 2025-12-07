"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IGuide } from "@/types/guide.interface";

export const guidesColumns: Column<IGuide>[] = [
    {
        header: "Guide",
        accessor: (guide) => (
            <UserInfoCell
                name={guide.name}
                email={guide.email}
                photo={guide.profilePhoto}
            />
        ),
        sortKey: "name",
    },
    {
        header: "Contact",
        accessor: (guide) => (
            <div className="flex flex-col">
                <span className="text-sm">{guide.contactNumber}</span>
            </div>
        ),
    },
    {
        header: "Status",
        accessor: (guide) => <StatusBadgeCell isDeleted={guide.isDeleted} />,
    },
    {
        header: "Joined",
        accessor: (guide) => <DateCell date={guide.createdAt} />,
        sortKey: "createdAt",
    },
];
