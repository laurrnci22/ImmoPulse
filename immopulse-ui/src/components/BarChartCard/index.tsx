import { type FC, useEffect, useState } from "react";
import type {DepartmentBarData} from "../../types/property.ts";
import {getDepartmentBarData} from "../../services/StatsService.ts";
import {Card} from '../ui/card.tsx';
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

interface BarChartCardProps {
    selectedDept: string;
    selectedType: string;
}

const BarChartCard: FC<BarChartCardProps> = ({
                                                       selectedDept,
                                                       selectedType,
                                                   }) => {
    const [stats, setStats] = useState<DepartmentBarData[]>([]);
    const [activeDeptChart, setActiveDeptChart] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDepartmentBarData(selectedDept, selectedType);
                setStats(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-semibold">Volume par Département</h2>
                    <p className="text-xs text-gray-500">Cliquez sur une barre pour isoler un
                        département.</p>
                </div>
                {activeDeptChart && (
                    <button
                        onClick={() => setActiveDeptChart(null)}
                        className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
                    >
                        Annuler le filtre ({activeDeptChart})
                    </button>
                )}
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="nom"/>
                    <YAxis/>
                    <Tooltip cursor={{fill: 'transparent'}}/>
                    <Bar dataKey="volume" onClick={(data) => setActiveDeptChart(data.nom)}>
                        {stats.map((entry, index) => (
                            <Cell
                                cursor="pointer"
                                key={`cell-${index}`}
                                fill={activeDeptChart === entry.nom || !activeDeptChart ? '#3b82f6' : '#e5e7eb'}
                                className="transition-all duration-300 hover:opacity-80"
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default BarChartCard;
