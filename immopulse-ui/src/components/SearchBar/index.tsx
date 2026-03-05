"use client";

import { Search } from "lucide-react";
import {Input} from "../ui/input.tsx";
import type {FC} from "react";


interface SearchBarProps {
    onSearch?: (val: string) => void;
    placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
                                                  onSearch,
                                                  placeholder = "Rechercher..."
                                              }) => {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
                type="text"
                placeholder={placeholder}
                className="pl-10 h-10 border-slate-200/60 bg-white/80 transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-300 focus:bg-white focus:shadow-sm w-full"
                onChange={(e) => onSearch?.(e.target.value)}
            />
        </div>
    );
};
