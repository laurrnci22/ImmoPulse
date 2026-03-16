import { type FC, useEffect, useState, useMemo } from "react";
import type { AreaDataPoint } from "../../types/property.ts";
import { getAreaData } from "../../services/StatsService.ts";
import { Card } from '../ui/card.tsx';
import { ChartLoading } from "../ui/chart-loading.tsx";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface AreaChartCardProps {
    selectedDept: string;
    selectedType: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f43f5e'];

const AreaChartCard: FC<AreaChartCardProps> = ({
    selectedDept,
    selectedType,
}) => {
    const [stats, setStats] = useState<AreaDataPoint[]>([]);
    const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true); 
            try {
                const data = await getAreaData(selectedDept, selectedType);
                setStats(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    const toggleSeries = (dataKey: string) => {
        setHiddenSeries(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
    };

    const propertyTypes = useMemo(() => {
        if (!stats || stats.length === 0) return [];
        
        const keys = new Set<string>();
        stats.forEach(dataPoint => {
            Object.keys(dataPoint).forEach(key => {
                if (key !== 'month') {
                    keys.add(key);
                }
            });
        });
        return Array.from(keys);
    }, [stats]);

    return (
        <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Évolution des volumes (Empilé)</h2>
            <p className="text-xs text-gray-500 mb-4">Cliquez sur la légende pour filtrer une typologie.</p>
            
            {isLoading ? (
                <ChartLoading />
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={stats} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px' }} />
                        <Legend
                            onClick={(e) => {
                                if (e?.dataKey && typeof e.dataKey === 'string') {
                                    toggleSeries(e.dataKey.trim());
                                }
                            }}
                            wrapperStyle={{ cursor: 'pointer' }}
                        />
                        
                        {propertyTypes.map((type, index) => {
                            const color = COLORS[index % COLORS.length];

                            return (
                                <Area
                                    key={type}
                                    type="monotone"
                                    dataKey={type}
                                    stackId="1"
                                    stroke={color}
                                    fill={color}
                                    fillOpacity={0.6}
                                    hide={hiddenSeries[type]}
                                />
                            );
                        })}
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
};

export default AreaChartCard;
