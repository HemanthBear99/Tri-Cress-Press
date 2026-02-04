"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "../shop/CartDrawer";
import { useToast } from "@/components/ui/toast";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudioRoute = pathname?.startsWith("/studio");
    const { ToastContainer } = useToast();

    if (isStudioRoute) {
        // Studio route: no navbar/footer
        return <>{children}</>;
    }

    // Regular routes: show navbar and footer
    return (
        <>
            <CartDrawer />
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
        </>
    );
}
