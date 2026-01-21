
import PublicNavbar from "@/components/shared/PublicNavbar";
import React from "react";
export const dynamic = "force-dynamic";

const MybookingsLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
           
            <div className="mx-auto container">{children}</div>
        </>
    );
};

export default MybookingsLayout;
