import Hero from "@/components/shared/Hero";
import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import Image from "next/image";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PublicNavbar />


            {children}
            <PublicFooter />
        </>
    );
};

export default CommonLayout;