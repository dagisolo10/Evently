"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Show, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSkeleton } from "../page-skeletons";
import Sidebar from "./sidebar";
import NavigationUserMenu from "./user-menu";

const publicLinks = [{ href: "/features", label: "Features" }];

const protectedNavLinks = [
    { href: "/dashboard", label: "Dashboard" },
    {
        trigger: "Event",
        items: [
            { label: "Events", href: "/dashboard/events" },
            { label: "Add Event", href: "/dashboard/events/new" },
        ],
    },
    { href: "/dashboard/vendors/directory", label: "Vendors" },
    { href: "/dashboard/finance", label: "Finance" },
];

const navLinkStyle = cn(
    "text-muted-foreground hover:text-foreground text-sm font-medium",
    "relative flex items-center py-2 transition-colors",
    "after:bg-foreground after:absolute after:inset-x-0 after:bottom-1 after:h-0.5",
    "after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:scale-x-100",
);

export default function NavBar() {
    const { isSignedIn, isLoaded } = useUser();
    const path = usePathname();

    if (!isLoaded) return <NavbarSkeleton />;

    const navLinks = isSignedIn ? [...protectedNavLinks, ...publicLinks] : publicLinks;

    return (
        <header className="sticky top-0 z-50">
            <nav className="flex h-14 items-center justify-between gap-6 backdrop-blur-3xl">
                <Link href="/" className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-60">
                    <Image src="/icon.svg" alt="App icon" width={28} height={28} className="drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    <span className="text-lg font-bold">Evently</span>
                </Link>

                <div className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    {navLinks.map((nav) => {
                        if ("trigger" in nav) {
                            return <NavigationDropdown nav={nav} key={nav.trigger} />;
                        }

                        return (
                            <Link
                                key={nav.href}
                                href={nav.href}
                                className={cn(path === nav.href && "text-foreground! after:scale-x-100!", navLinkStyle)}
                            >
                                {nav.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="md:hidden">
                    <Sidebar />
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    <Show when={"signed-out"}>
                        <div className="flex items-center gap-8">
                            <SignInButton mode="modal">
                                <button className={cn(navLinkStyle, "text-foreground")}>Log In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className={cn(navLinkStyle, "text-foreground")}>Get Started</button>
                            </SignUpButton>
                        </div>
                    </Show>

                    <NavigationUserMenu />
                </div>
            </nav>
        </header>
    );
}

type Nav = { nav: { label: string; href: string } | { trigger: string; items: { label: string; href: string }[] } };

function NavigationDropdown({ nav }: Nav) {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn("text-muted-foreground hover:text-foreground px-0 text-sm font-medium")}>
                        {"trigger" in nav ? nav.trigger : ""}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <div className="w-32">
                            {"items" in nav &&
                                nav.items.map((item, itemIndex) => (
                                    <NavigationMenuLink asChild key={itemIndex}>
                                        <Link href={item.href} className={navLinkStyle}>
                                            {item.label}
                                        </Link>
                                    </NavigationMenuLink>
                                ))}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
