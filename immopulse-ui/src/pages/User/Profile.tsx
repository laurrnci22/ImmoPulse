import React, { type ChangeEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { generateSecurePassword, passwordStrength } from "../../utils/GeneratePassword.ts";
import type { AuthContextType } from "../../types/AuthContextType.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import Modal from "../../components/ui/modal.tsx";
import type {UpdateUserRequest} from "../../types/AuthType.ts";
import {useNavigate} from "react-router-dom";

const Profile: React.FC = () => {
    const auth: AuthContextType | undefined = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: auth?.user?.username || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [modal, setModal] = useState<{ show: boolean; message: string; type?: "error" | "success" | "info" }>({
        show: false,
        message: "",
        type: "error"
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            setModal({ show: true, message: "Les mots de passe ne correspondent pas", type: "error" });
            return;
        }

        try {
            const requestData: UpdateUserRequest = {
                username: form.username,
                password: form.newPassword,
                role: auth?.user?.role || "USER",
            };

            const response = await auth?.update?.(requestData, auth?.user?.username);

            if (response) {
                setModal({show: true, message: "Profil mis à jour avec succès", type: "success"});
            } else {
                setModal({show: true, message: "Nom d'utilisateur déjà utilisé !", type: "error"});
            }

            navigate("/user/profile");

        } catch (error) {
            setModal({show: true, message: "Erreur lors du mise à jour de l'utilisateur", type: "error"});
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleGeneratePassword = () => {
        const password = generateSecurePassword();
        setForm(prev => ({ ...prev, newPassword: password, confirmPassword: password }));
    };

    const strength = passwordStrength(form);

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 m-10">

                {/* PROFILE */}
                <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
                        <p className="text-sm text-gray-500">Mettre à jour votre profil</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                        <input
                            name="username"
                            type="text"
                            value={form.username}
                            placeholder="tom.cook"
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-800 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                        />
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">

                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Mot de passe</h2>
                            <p className="text-sm text-gray-500">Modifier votre mot de passe</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleGeneratePassword}
                            className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-500"
                        >
                            Générer
                        </button>
                    </div>

                    {/* Current password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                        <div className="relative mt-1">
                            <input
                                type={show.current ? "text" : "password"}
                                name="currentPassword"
                                value={form.currentPassword}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-gray-800 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(prev => ({ ...prev, current: !prev.current }))}
                                className="absolute right-2 top-2 text-gray-500"
                            >
                                {show.current ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                        <div className="relative mt-1">
                            <input
                                type={show.new ? "text" : "password"}
                                name="newPassword"
                                value={form.newPassword}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-gray-800 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(prev => ({ ...prev, new: !prev.new }))}
                                className="absolute right-2 top-2 text-gray-500"
                            >
                                {show.new ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Strength bar */}
                        {form.newPassword && (
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

                    {/* Confirm password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                        <div className="relative mt-1">
                            <input
                                type={show.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pr-10 text-gray-800 focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute right-2 top-2 text-gray-500"
                            >
                                {show.confirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-500 transition"
                    >
                        Mettre à jour
                    </button>
                </div>
            </form>

            {/* MODAL */}
            <Modal
                show={modal.show}
                message={modal.message}
                type={modal.type}
                onClose={() => setModal(prev => ({ ...prev, show: false }))}
            />
        </>
    );
};

export default Profile;