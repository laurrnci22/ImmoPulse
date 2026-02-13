import * as React from "react";

export interface NavigationItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

export interface UserData {
    name: string;
    email: string;
    imageUrl: string;
}

export interface HeaderProps {
    onSearch?: (query: string) => void;
    userName?: string;
}