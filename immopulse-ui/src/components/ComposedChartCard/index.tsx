import { type FC, useEffect, useState } from "react";
import type {PropertyMarketDynamics} from "../../types/property.ts";
import {getPropertyMarkets} from "../../services/StatsService.ts";
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

interface ComposedChartCardProps {
    selectedDept: string;
    selectedType: string;
}

const ComposedChartCard: FC<ComposedChartCardProps> = ({
                                                       selectedDept,
                                                       selectedType,
                                                   }) => {
    const [stats, setStats] = useState<PropertyMarketDynamics[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getPropertyMarkets(selectedDept, selectedType);
                setStats(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    return (
        <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-2">Dynamique : Volume vs Prix</h2>
            <p className="text-xs text-gray-500 mb-4">Corrélation entre l'offre/demande et l'évolution
                des prix.</p>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                    <XAxis dataKey="month" tick={{fontSize: 12}}/>
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6"
                            domain={['auto', 'auto']}/>
                    <Tooltip contentStyle={{borderRadius: '8px'}}/>
                    <Legend/>
                    <Bar yAxisId="left" dataKey="volumeVentes" name="Volume" fill="#3b82f6"
                            radius={[4, 4, 0, 0]}/>
                    <Line yAxisId="right" type="monotone" dataKey="prixMoyen" name="Prix/m² (€)"
                            stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}}/>
                </ComposedChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default ComposedChartCard;
