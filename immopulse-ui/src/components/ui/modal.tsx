import type { FC, ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
    show: boolean;
    title?: string;
    message: string | ReactNode;
    onClose: () => void;
    type?: "error" | "success" | "info";
    duration?: number; // durée en ms avant fermeture auto
};

const typeColors = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
};

const Modal: FC<ModalProps> = ({ show, title, message, onClose, type = "info", duration = 4000 }) => {

    useEffect(() => {
        if (!show) return;

        const timer = setTimeout(onClose, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [show, duration, onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute top-4 right-4 flex flex-col gap-3 pointer-events-auto">
                <div className="max-w-sm w-full transform transition-all duration-300 ease-out scale-95 opacity-0 animate-pop-in">
                    <div className={`rounded-lg shadow-lg p-4 ${typeColors[type]} flex justify-between items-start`}>
                        <div className="flex-1">
                            {title && <h4 className="font-semibold mb-1">{title}</h4>}
                            <p className="text-sm">{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-4 text-white text-lg font-bold hover:opacity-80 transition"
                        >
                            ×
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;