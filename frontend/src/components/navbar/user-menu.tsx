"use client";

import { Show, UserButton } from "@clerk/nextjs";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";

export default function NavigationUserMenu() {
    const { theme, setTheme } = useTheme();

    const toggleThemeCycle = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    const themeIcon =
        theme === "light" ? (
            <Sun className="size-4 text-orange-500" />
        ) : theme === "dark" ? (
            <Moon className="size-4 text-indigo-400" />
        ) : (
            <Monitor className="text-muted-foreground size-4" />
        );

    return (
        <Show when={"signed-in"}>
            <UserButton fallback={<Skeleton className="size-8 rounded-full" />}>
                <UserButton.MenuItems>
                    <UserButton.Action
                        label={`Theme: ${theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "System"}`}
                        labelIcon={themeIcon}
                        onClick={toggleThemeCycle}
                    />
                </UserButton.MenuItems>
            </UserButton>
        </Show>
    );
}
