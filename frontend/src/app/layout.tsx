import "./globals.css";

import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/user-sync";
import { Toaster } from "@/components/ui/sonner";
import NewNavBar from "@/components/navbar/navbar";
import QueryProvider from "@/components/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Manrope, Playfair_Display, Poppins } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: "300" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: "300" });

export const metadata: Metadata = {
    title: "Evently — Professional Event Organizer Dashboard",
    description:
        "Take full control of your events with Evently. Manage vendors, track budgets, coordinate timelines, and organize every detail effortlessly from one powerful dashboard.",
    icons: {
        icon: "/icon.svg",
    },
    keywords: [
        "event management",
        "event organizer",
        "vendor management",
        "budget tracking",
        "event planning",
        "professional planner",
        "timeline management",
    ],
    authors: [{ name: "Evently Team" }],
    openGraph: {
        title: "Evently — Professional Event Organizer Dashboard",
        description:
            "Manage your events, vendors, budgets, and timelines with ease. Evently is the ultimate dashboard for professional event organizers.",
        url: "https://www.Evently.com",
        siteName: "Evently",
        images: [
            {
                url: "https://www.Evently.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Evently Dashboard Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Evently — Professional Event Organizer Dashboard",
        description: "Take full control of your events, vendors, budgets, and timelines with Evently.",
        images: ["https://www.Evently.com/og-image.png"],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("h-full antialiased", manrope.variable, playfair.variable, poppins.variable)}>
            <body className="flex min-h-full flex-col">
                <ClerkProvider>
                    <QueryProvider>
                        <TooltipProvider>
                            <ThemeProvider attribute="class" enableSystem disableTransitionOnChange defaultTheme="dark">
                                <main className="h-screen scrollbar-thin overflow-y-auto">
                                    <div className="mx-auto max-w-11/12">
                                        <NewNavBar />
                                        <UserSync />
                                        <div className="pt-12">{children}</div>
                                        <Toaster position="top-center" />
                                        <ReactQueryDevtools />
                                    </div>
                                </main>
                            </ThemeProvider>
                        </TooltipProvider>
                    </QueryProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
