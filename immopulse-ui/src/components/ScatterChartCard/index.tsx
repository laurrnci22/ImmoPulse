import { type FC, useEffect, useState } from "react";
import type {ScatterDataPoint} from "../../types/property.ts";
import {getScatterData} from "../../services/StatsService.ts";
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

interface ScatterChartCardProps {
    selectedDept: string;
    selectedType: string;
}

const ScatterChartCard: FC<ScatterChartCardProps> = ({
                                                       selectedDept,
                                                       selectedType,
                                                   }) => {
    const [stats, setStats] = useState<ScatterDataPoint[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getScatterData(selectedDept, selectedType);
                setStats(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);


    const CustomScatterTooltip = ({active, payload}: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                    <p className="font-bold text-gray-800">{data.type} à {data.ville}</p>
                    <p className="text-sm text-gray-600">Surface : <span
                        className="font-semibold">{data.surface} m²</span></p>
                    <p className="text-sm text-gray-600">Prix : <span
                        className="font-semibold text-blue-600">{data.prix.toLocaleString('fr-FR')} €</span></p>
                    <p className="text-xs text-gray-400 mt-1">Ratio
                        : {Math.round(data.prix / data.surface).toLocaleString()} €/m²</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Analyse Prix / Surface</h2>
            <p className="text-xs text-gray-500 mb-4">Détection de décote (survolez pour les
                détails).</p>
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
                    <XAxis type="number" dataKey="surface" name="Surface" unit=" m²"/>
                    <YAxis type="number" dataKey="prix" name="Prix" unit=" €"
                            tickFormatter={(val) => `${val / 1000}k`}/>
                    <ZAxis type="category" dataKey="type" name="Type"/>
                    <Tooltip content={<CustomScatterTooltip/>} cursor={{strokeDasharray: '3 3'}}/>
                    <Scatter name="Transactions" data={stats} fill="#8b5cf6"
                                shape="circle"/>
                </ScatterChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default ScatterChartCard;
