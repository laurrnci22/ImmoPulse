"use client";

import * as React from "react";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

// 1. Le composant principal
export function Dialog({ isOpen, onClose, children }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen) {
      dialog?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog?.close();
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
      <dialog
          ref={dialogRef}
          onClick={handleBackdropClick}
          className="fixed rounded-lg border border-gray-200 bg-white p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95 duration-200 max-w-lg w-[calc(100%-2rem)]"
      >
        <div className="relative p-6">
          <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X className="size-4" />
          </button>
          {children}
        </div>
      </dialog>
  );
}

// 2. Les sous-composants pour la compatibilité
export const DialogHeader = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col gap-1.5 text-center sm:text-left mb-4 ${className}`} {...props} />
);

export const DialogFooter = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-6 ${className}`} {...props} />
);

export const DialogTitle = ({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
);

export const DialogDescription = ({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`text-sm text-gray-500 ${className}`} {...props} />
);

// Pour éviter d'autres erreurs, on exporte des versions vides des composants Radix dont on n'a plus besoin
export const DialogContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;