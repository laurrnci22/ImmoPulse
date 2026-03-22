"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { useAuth } from "../../hooks/useAuth.ts";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { generateSecurePassword, passwordStrength } from "../../utils/GeneratePassword.ts";
import type { SignUpRequest } from "../../types/AuthType.ts";

export const Register = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [role, setRole] = useState<"USER" | "ADMIN">("USER");
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePassword = () => {
        const pwd = generateSecurePassword();
        setPassword(pwd);
    };

    const strength = passwordStrength({ newPassword: password });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {

            const requestData: SignUpRequest = {
                username,
                password,
                role,
            };

            const response = await auth?.signUp?.(requestData);

            if (response) {
                toast.success("Compte créé avec succès !");
                navigate("/");
            }

        } catch (error) {
            toast.error("Erreur lors de l'inscription.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">

            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm border border-slate-100">

                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Créer un compte
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Rejoins ImmoPulse dès aujourd'hui
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    <div className="space-y-4">

                        {/* ROLE */}
                        <div className="flex w-full p-1 bg-slate-100 rounded-lg">

                            <Button
                                type="button"
                                variant={role === "USER" ? "default" : "ghost"}
                                className={`w-1/2 text-sm ${role === "USER" ? "shadow-sm" : ""}`}
                                onClick={() => setRole("USER")}
                            >
                                Utilisateur
                            </Button>

                            <Button
                                type="button"
                                variant={role === "ADMIN" ? "default" : "ghost"}
                                className={`w-1/2 text-sm ${role === "ADMIN" ? "shadow-sm" : ""}`}
                                onClick={() => setRole("ADMIN")}
                            >
                                Administrateur
                            </Button>

                        </div>

                        {/* USERNAME */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nom d'utilisateur
                            </label>

                            <Input
                                type="text"
                                required
                                placeholder="ex: tom.cook"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>

                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-slate-700">
                                    Mot de passe
                                </label>

                                <button
                                    type="button"
                                    onClick={handleGeneratePassword}
                                    className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-500"
                                >
                                    Générer
                                </button>
                            </div>

                            <div className="relative">

                                <Input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-2 text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="w-5 h-5"/>
                                    ) : (
                                        <EyeIcon className="w-5 h-5"/>
                                    )}
                                </button>

                            </div>

                            {/* Strength bar */}
                            {password && (
                                <div className="mt-2 h-2 w-full bg-gray-200 rounded">

                                    <div
                                        className={`h-2 rounded transition-all ${
                                            strength <= 1
                                                ? "w-1/4 bg-red-500"
                                                : strength === 2
                                                    ? "w-2/4 bg-yellow-500"
                                                    : strength === 3
                                                        ? "w-3/4 bg-blue-500"
                                                        : "w-full bg-green-500"
                                        }`}
                                    />

                                </div>
                            )}

                        </div>

                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || !username || !password}
                    >
                        {isLoading ? "Création en cours..." : "S'inscrire"}
                    </Button>

                </form>

            </div>

        </div>
    );
};