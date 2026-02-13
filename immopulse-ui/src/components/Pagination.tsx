import { Button } from "./ui/button.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    isFetching?: boolean;
}



export function Pagination({
                               currentPage,
                               totalPages,
                               totalElements,
                               pageSize,
                               onPageChange,
                               isFetching = false,
                           }: PaginationProps) {
    if (totalPages <= 1) return null;

    const startRange = currentPage * pageSize + 1;
    const endRange = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="flex flex-col items-center gap-4 py-8 border-t border-slate-100">
            <div className="flex items-center gap-2">
                {/* Bouton Précédent */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0 || isFetching}
                    className="flex items-center gap-1"
                >
                    <ChevronLeft className="size-4" /> Précédent
                </Button>

                <div className="px-4 py-1 bg-slate-100 rounded-md text-sm font-semibold text-slate-700">
                    Page {currentPage + 1} sur {totalPages}
                </div>

                {/* Bouton Suivant */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1 || isFetching}
                    className="h-9 w-9 p-0 md:w-auto md:px-4"
                >
                    Suivant <ChevronRight className="size-4" />
                </Button>
            </div>
            <p className="text-xs text-slate-400">
                Affichage des résultats {startRange} à {endRange}
            </p>
        </div>
    );
}