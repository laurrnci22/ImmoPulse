"use client";

import type {NavigationItem} from "../../types/general.ts";
import type {FC} from "react";
import {SearchBar} from "../SearchBar";
import {Link} from "react-router-dom";
import {Button} from "../ui/button.tsx";
import type {User} from "../../types/user.ts";

interface MobileMenuProps {
    isProperties: boolean;
    onSearch?: (val: string) => void;
    navigate: (path: string) => void;
    closeMenu: () => void;
    isAuthenticated: boolean;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    onLogoutClick: () => void;
    navItems: NavigationItem[];
    user: User | null;
}

const userNavigation = [
    { name: "Mon Profil", href: "/profile" },
    { name: "Paramètres", href: "/settings" },
    { name: "Déconnexion", href: "/logout" },
];

export const MobileMenu: FC<MobileMenuProps> = ({
                                                    isProperties,
                                                    onSearch,
                                                    navigate,
                                                    closeMenu,
                                                    isAuthenticated,
                                                    onLoginClick,
                                                    onRegisterClick,
                                                    onLogoutClick,
                                                    navItems,
                                                    user
                                                }) => {
    return (
        <div className="md:hidden border-t bg-white">
            <div className="space-y-1 px-4 pt-2 pb-3">
                {isProperties && (
                    <div className="mb-4 mt-2">
                        <SearchBar onSearch={onSearch} />
                    </div>
                )}
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => {
                            navigate(item.href);
                            closeMenu();
                        }}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <item.icon className="size-5" />
                        {item.name}
                    </button>
                ))}
            </div>

            {isAuthenticated ? (
                <div className="border-t border-gray-100 pt-4 pb-3">
                    <div className="flex items-center px-5">
                        <div className="shrink-0">
                            <img className="size-10 rounded-full" src={user?.imageUrl} alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">{user?.username}</div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-1 px-4">
                        {userNavigation.map((item) => (
                            item.href === "/logout" ? (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        closeMenu();
                                        onLogoutClick();
                                    }}
                                    className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={closeMenu}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            ) : (
                <div className="border-t border-gray-100 pt-4 pb-3 px-4 flex flex-col gap-2">
                    <Button className="w-full" variant="outline" onClick={onLoginClick}>
                        Se connecter
                    </Button>
                    <Button className="w-full" onClick={onRegisterClick}>
                        S'inscrire
                    </Button>
                </div>
            )}
        </div>
    );
};
