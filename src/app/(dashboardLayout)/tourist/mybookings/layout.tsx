
import PublicNavbar from "@/components/shared/PublicNavbar";
import React from "react";

const MybookingsLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <PublicNavbar></PublicNavbar>
            <div className="">{children}</div>
        </>
    );
};

export default MybookingsLayout;
