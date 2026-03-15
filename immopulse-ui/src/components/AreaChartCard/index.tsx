import { type FC, useEffect, useState } from "react";
import type {AreaDataPoint} from "../../types/property.ts";
import {getAreaData} from "../../services/StatsService.ts";
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

interface AreaChartCardProps {
    selectedDept: string;
    selectedType: string;
}


const AreaChartCard: FC<AreaChartCardProps> = ({
                                                       selectedDept,
                                                       selectedType,
                                                   }) => {
    const [stats, setStats] = useState<AreaDataPoint[]>([]);
    const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAreaData(selectedDept, selectedType);
                setStats(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    const toggleSeries = (dataKey: string) => {
        setHiddenSeries(prev => ({...prev, [dataKey]: !prev[dataKey]}));
    };


    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Évolution des volumes (Empilé)</h2>
            <p className="text-xs text-gray-500 mb-4">Cliquez sur la légende pour filtrer une
                typologie.</p>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stats} margin={{top: 10, right: 10, left: 0, bottom: 0}}>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <Tooltip contentStyle={{borderRadius: '8px'}}/>
                    <Legend 
                        onClick={(e) => {
                            if (e?.dataKey && typeof e.dataKey === 'string') {
                                toggleSeries(e.dataKey.trim());
                            }
                        }}
                        wrapperStyle={{cursor: 'pointer'}}
                    />
                    {!hiddenSeries['appartement'] &&
                        <Area type="monotone" dataKey="appartement" stackId="1" stroke="#3b82f6"
                                fill="#3b82f6" fillOpacity={0.6}/>}
                    {!hiddenSeries['maison'] &&
                        <Area type="monotone" dataKey="maison" stackId="1" stroke="#10b981"
                                fill="#10b981" fillOpacity={0.6}/>}
                    {!hiddenSeries['terrain'] &&
                        <Area type="monotone" dataKey="terrain" stackId="1" stroke="#f59e0b"
                                fill="#f59e0b" fillOpacity={0.6}/>}
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default AreaChartCard;
