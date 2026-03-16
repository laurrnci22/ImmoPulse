import type { FC } from "react";

export const ChartLoading: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
            <span className="text-sm text-gray-500">Chargement des données...</span>
        </div>
    );
};