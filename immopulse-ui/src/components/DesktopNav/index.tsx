"use client";


import type {NavigationItem} from "../../types/general.ts";
import type {FC} from "react";
import {Button} from "../ui/button.tsx";

interface DesktopNavProps {
    currentPath: string;
    navigate: (path: string) => void;
    navItems: NavigationItem[];
}

export const DesktopNav: FC<DesktopNavProps> = ({
                                                    currentPath,
                                                    navigate,
                                                    navItems
                                                }) => {
    return (
        <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
                const isProperties = currentPath === "/properties" || currentPath === "/";
                const isDashboard = currentPath === "/dashboard";
                const isActive = (item.href === "/properties" && isProperties) ||
                    (item.href === "/dashboard" && isDashboard);

                return (
                    <Button
                        key={item.name}
                        variant={isActive ? "default" : "ghost"}
                        onClick={() => navigate(item.href)}
                        className="gap-2"
                    >
                        <item.icon className="size-4" />
                        {item.name}
                    </Button>
                );
            })}
        </nav>
    );
};
