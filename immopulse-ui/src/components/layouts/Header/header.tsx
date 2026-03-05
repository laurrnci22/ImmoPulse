"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart3, Menu as MenuIcon, X } from "lucide-react";

import logo from "../../../assets/full-logo.png";
import { Button } from "../../ui/button";
import type { HeaderProps, NavigationItem } from "../../../types/general.ts";
import { useAuth } from "../../../hooks/useAuth.ts";
import type { AuthContextType } from "../../../types/AuthContextType.ts";
import {type FC, useState} from "react";
import {DesktopNav} from "../../DesktopNav";
import {SearchBar} from "../../SearchBar";
import {UserActions} from "../../UserActions";
import {MobileMenu} from "../../MobileMenu";


const navigation: NavigationItem[] = [
    { name: "Annonces", href: "/properties", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

export const Header: FC<HeaderProps> = ({ onSearch }) => {
    const auth: AuthContextType | undefined = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const isProperties = location.pathname === "/properties" || location.pathname === "/";
    const isAdmin = auth?.user?.role === "ADMIN";
    console.log("user ---- ")
    console.log(auth?.user)

    const allowedNavigation = navigation.filter((item) => {
        if (item.name === "Dashboard") {
            return isAdmin;
        }
        return true;
    });

    const onLoginClick = async () => {
        await auth?.loginUser?.();
        setIsMobileMenuOpen(false);
    };

    const onRegisterClick = () => {
        navigate("/register");
        setIsMobileMenuOpen(false);
    };

    const onLogoutClick = async () => {
        await auth?.logoutUser?.();
        setIsMobileMenuOpen(false);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="shrink-0">
                            <img alt="ImmoPulse" src={logo} className="h-10 w-auto" />
                        </Link>
                        <DesktopNav currentPath={location.pathname} navigate={navigate} navItems={allowedNavigation} />
                    </div>

                    {isProperties && (
                        <div className="hidden lg:flex flex-1 max-w-md">
                            <SearchBar onSearch={onSearch} placeholder="Ville, code postal..." />
                        </div>
                    )}

                    <div className="hidden md:flex items-center gap-3">
                        {auth?.user ? (
                            <UserActions user={auth?.user} onLogoutClick={onLogoutClick} />
                        ) : (
                            <>
                                <Button variant="ghost" onClick={onLoginClick}>
                                    Se connecter
                                </Button>
                                <Button onClick={onRegisterClick}>
                                    S'inscrire
                                </Button>
                            </>
                        )}
                    </div>

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

            {isMobileMenuOpen && (
                <MobileMenu
                    isProperties={isProperties}
                    onSearch={onSearch}
                    navigate={navigate}
                    closeMenu={() => setIsMobileMenuOpen(false)}
                    isAuthenticated={!!auth?.user}
                    onLoginClick={onLoginClick}
                    onRegisterClick={onRegisterClick}
                    onLogoutClick={onLogoutClick}
                    navItems={allowedNavigation}
                    user={auth?.user}
                />
            )}
        </header>
    );
};
