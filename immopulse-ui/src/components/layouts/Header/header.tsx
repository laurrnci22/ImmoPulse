"use client";

import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Search,
    Heart,
    BarChart3,
    Home,
    Menu as MenuIcon,
    X,
    Bell
} from "lucide-react";

import logo from "../../../assets/full-logo.png";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import type {HeaderProps, NavigationItem, UserData} from "../../../types/general.ts";

// --- MOCK DATA ---
// TODO : à retirer une fois la connexion utilisateur fonctionne
const user: UserData = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation: NavigationItem[] = [
    { name: "Annonces", href: "/properties", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

const userNavigation = [
    { name: "Mon Profil", href: "/profile" },
    { name: "Paramètres", href: "/settings" },
    { name: "Déconnexion", href: "/logout" },
];


export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const isProperties = location.pathname === "/properties" || location.pathname === "/";
    const isDashboard = location.pathname === "/dashboard";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-8">

                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="shrink-0">
                            <img alt="ImmoPulse" src={logo} className="h-10 w-auto" />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navigation.map((item) => {
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
                    </div>

                    {/* Search Bar (Desktop) */}
                    {isProperties && (
                        <div className="hidden lg:flex flex-1 max-w-md">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

                                {/* TODO : la recherche à gérer si on a le temps */}
                                <Input
                                    type="text"
                                    placeholder="Ville, code postal..."
                                    className="pl-10 h-10 border-slate-200/60 bg-white/80 transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-300 focus:bg-white focus:shadow-sm"
                                    onChange={(e) => onSearch?.(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* User Actions (Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative text-gray-500">
                            <span className="sr-only">Notifications</span>
                            <Bell className="size-5" />
                            <span className="absolute top-2 right-2 size-2 bg-indigo-600 rounded-full border-2 border-white" />
                        </Button>

                        <Button variant="ghost" size="icon" className="text-gray-500">
                            <Heart className="size-5" />
                        </Button>

                        {/* Profile Dropdown */}
                        <div className="relative ml-3">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <img className="size-9 rounded-full" src={user.imageUrl} alt="" />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                    {userNavigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="size-6" /> : <MenuIcon className="size-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-white">
                    <div className="space-y-1 px-4 pt-2 pb-3">
                        {isProperties && (
                            <div className="relative w-full mb-4 mt-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="pl-10"
                                    onChange={(e) => onSearch?.(e.target.value)}
                                />
                            </div>
                        )}
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(item.href);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <item.icon className="size-5" />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile User Info */}
                    <div className="border-t border-gray-100 pt-4 pb-3">
                        <div className="flex items-center px-5">
                            <div className="shrink-0">
                                <img className="size-10 rounded-full" src={user.imageUrl} alt="" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-4">
                            {userNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};