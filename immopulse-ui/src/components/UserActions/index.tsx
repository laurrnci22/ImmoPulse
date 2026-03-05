"use client";

import { Link } from "react-router-dom";
import { Bell, Heart } from "lucide-react";
import { Button } from "../ui/button";
import {type FC, useState} from "react";
import type {User} from "../../types/user.ts";

interface UserActionsProps {
    user: User;
    onLogoutClick: () => void;
}

const userNavigation = [
    { name: "Mon Profil", href: "/profile" },
    { name: "Paramètres", href: "/settings" },
    { name: "Déconnexion", href: "/logout" },
];

export const UserActions: FC<UserActionsProps> = ({ user, onLogoutClick }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-gray-500">
                <span className="sr-only">Notifications</span>
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-indigo-600 rounded-full border-2 border-white" />
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-500">
                <Heart className="size-5" />
            </Button>

            <div className="relative ml-3">
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <img className="size-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt={user.username} />
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-3 border-b border-gray-100 mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user.username}
                            </p>
                        </div>
                        {userNavigation.map((item) => (
                            item.href === "/logout" ? (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        onLogoutClick();
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
