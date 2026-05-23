import NavBar from "@/components/navbar/navbar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <main>
            <NavBar />
            <div className="py-12">{children}</div>
        </main>
    );
}
