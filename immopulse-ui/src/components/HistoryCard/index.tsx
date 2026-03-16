import { type FC, useEffect, useState, useMemo } from "react";
import type { HistoryDataPoint } from "../../types/property.ts";
import { getHistory } from "../../services/StatsService.ts";
import { Card } from '../ui/card.tsx';
import { ChartLoading } from '../ui/chart-loading.tsx';
import { TrendingDown, TrendingUp, ChevronLeft, ChevronRight, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

interface HistoryCardProps {
}

type SortConfig = {
    key: keyof HistoryDataPoint | null;
    direction: 'asc' | 'desc';
};

const HistoryCard: FC<HistoryCardProps> = ({
}) => {
    const [stats, setStats] = useState<HistoryDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
    
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                const data = await getHistory();
                setStats(data);
                setCurrentPage(1);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    const sortedData = useMemo(() => {
        let sortableItems = [...stats];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
                
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [stats, sortConfig]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    
    const currentData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key: keyof HistoryDataPoint) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getSortIcon = (columnKey: keyof HistoryDataPoint) => {
        if (sortConfig.key !== columnKey) return <ArrowUpDown className="size-3 ml-1 text-gray-400" />;
        return sortConfig.direction === 'asc' ? 
            <ChevronUp className="size-3 ml-1 text-blue-600" /> : 
            <ChevronDown className="size-3 ml-1 text-blue-600" />;
    };

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Palmarès des départements</h2>
            
            {isLoading ? (
                <ChartLoading />
            ) : (
                <>
                    <div className="overflow-x-auto min-h-[450px]">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-sm select-none">
                                    <th 
                                        className="text-left py-3 px-4 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleSort('departmentCode')}
                                    >
                                        <div className="flex items-center">
                                            Département {getSortIcon('departmentCode')}
                                        </div>
                                    </th>
                                    <th 
                                        className="text-right py-3 px-4 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleSort('avgPricePerSqm')}
                                    >
                                        <div className="flex items-center justify-end">
                                            Prix moyen/m² {getSortIcon('avgPricePerSqm')}
                                        </div>
                                    </th>
                                    <th 
                                        className="text-right py-3 px-4 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleSort('avgPrice')}
                                    >
                                        <div className="flex items-center justify-end">
                                            Prix moyen {getSortIcon('avgPrice')}
                                        </div>
                                    </th>
                                    <th 
                                        className="text-right py-3 px-4 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleSort('totalSales')}
                                    >
                                        <div className="flex items-center justify-end">
                                            Nb ventes {getSortIcon('totalSales')}
                                        </div>
                                    </th>
                                    <th 
                                        className="text-right py-3 px-4 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => handleSort('priceEvolution')}
                                    >
                                        <div className="flex items-center justify-end">
                                            Évolution {getSortIcon('priceEvolution')}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((dept) => (
                                    <tr key={dept.departmentCode} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="py-3 px-4 font-medium text-gray-800">Dép. {dept.departmentCode}</td>
                                        <td className="text-right py-3 px-4">{dept.avgPricePerSqm.toLocaleString('fr-FR')} €</td>
                                        <td className="text-right py-3 px-4">{(dept.avgPrice / 1000).toFixed(0)}K €</td>
                                        <td className="text-right py-3 px-4">{dept.totalSales.toLocaleString('fr-FR')}</td>
                                        <td className="text-right py-3 px-4">
                                            <span className={`inline-flex items-center gap-1 ${dept.priceEvolution > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {dept.priceEvolution > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                                                {dept.priceEvolution > 0 ? '+' : ''}{dept.priceEvolution}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <span className="text-sm text-gray-500">
                                Page {currentPage} sur {totalPages}
                            </span>
                            <div className="flex gap-2">
                            <button
                                type="button"
                                aria-label="Page précédente"
                                title="Page précédente"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="size-5" />
                            </button>
                            <button
                                type="button"
                                aria-label="Page suivante"
                                title="Page suivante"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="size-5" />
                            </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Card>
    );
};

export default HistoryCard;