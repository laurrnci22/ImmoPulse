import { type FC, useEffect, useState } from "react";
import type {HistoryDataPoint} from "../../types/property.ts";
import {getHistory} from "../../services/StatsService.ts";
import {Card} from '../ui/card.tsx';
import {TrendingDown, TrendingUp} from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis
  } from 'recharts';
import { data } from "react-router-dom";

interface HistoryCardProps {
    selectedDept: string;
    selectedType: string;
}

const HistoryCard: FC<HistoryCardProps> = ({
                                                       selectedDept,
                                                       selectedType,
                                                   }) => {
    const [stats, setStats] = useState<HistoryDataPoint[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getHistory();
                setStats(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    return (
        <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Palmarès des départements</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b text-sm">
                                    <th className="text-left py-3 px-4 font-semibold">Département</th>
                                    <th className="text-right py-3 px-4 font-semibold">Prix moyen/m²</th>
                                    <th className="text-right py-3 px-4 font-semibold">Prix moyen</th>
                                    <th className="text-right py-3 px-4 font-semibold">Nb ventes</th>
                                    <th className="text-right py-3 px-4 font-semibold">Évolution</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stats.map((dept) => (
                                    <tr key={dept.departmentCode} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="py-3 px-4 font-medium text-gray-800">Dép. {dept.departmentCode}</td>
                                        <td className="text-right py-3 px-4">{dept.avgPricePerSqm.toLocaleString('fr-FR')} €</td>
                                        <td className="text-right py-3 px-4">{(dept.avgPrice / 1000).toFixed(0)}K €</td>
                                        <td className="text-right py-3 px-4">{dept.totalSales.toLocaleString('fr-FR')}</td>
                                        <td className="text-right py-3 px-4">
                        <span
                            className={`inline-flex items-center gap-1 ${dept.priceEvolution > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {dept.priceEvolution > 0 ? <TrendingUp className="size-3"/> :
                              <TrendingDown className="size-3"/>}
                            {dept.priceEvolution > 0 ? '+' : ''}{dept.priceEvolution}%
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
    );
};

export default HistoryCard;
