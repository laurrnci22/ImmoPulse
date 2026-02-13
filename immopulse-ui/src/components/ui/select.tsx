"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ options, className = "", ...props }: SelectProps) {
  return (
      <div className="relative w-full">
        <select
            className={`
          w-full h-9 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm
          appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
            {...props}
        >
          {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
          ))}
        </select>

        {/* Icône personnalisée pour remplacer la flèche moche du navigateur */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <ChevronDown className="size-4" />
        </div>
      </div>
  );
}

export const SelectGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => <>{placeholder}</>;
export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectItem = ({children}: { children: React.ReactNode, value?: string }) => <>{children}</>;