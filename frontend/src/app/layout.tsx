import "./globals.css";

import { ClerkTokenProvider } from "@/components/providers/clerk-token-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserSync from "@/components/user-sync";
import { rootMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Manrope, Playfair_Display, Poppins } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: "300" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: "300" });

export const metadata = rootMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("h-full antialiased", manrope.variable, playfair.variable, poppins.variable)}>
            <body className="flex min-h-full flex-col">
                <ClerkProvider>
                    <ClerkTokenProvider>
                        <QueryProvider>
                            <TooltipProvider>
                                <ThemeProvider attribute="class" enableSystem disableTransitionOnChange defaultTheme="dark">
                                    <UserSync>
                                        <main className="h-screen scrollbar-thin overflow-y-auto">
                                            <div className="mx-auto max-w-11/12">
                                                {children}
                                                <Toaster position="top-center" />
                                                <ReactQueryDevtools />
                                            </div>
                                        </main>
                                    </UserSync>
                                </ThemeProvider>
                            </TooltipProvider>
                        </QueryProvider>
                    </ClerkTokenProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
