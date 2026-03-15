import {type FC, useEffect, useState} from "react";
import { Card } from "../ui/card.tsx";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import type { PropertyTypeDistribution} from "../../types/property.ts";
import {getPropertyTypesDistribution} from "../../services/StatsService.ts";

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#22c55e', '#eab308'];

interface PieChartProps {
    selectedDept: string;
    selectedType: string;
}

export const PieChartComponent: FC<PieChartProps> = ({
                                                         selectedDept,
                                                         selectedType,
                                          }) => {

    const [propertyTypesDistribution, setPropertyTypesDistribution] = useState<PropertyTypeDistribution[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getPropertyTypesDistribution(selectedDept, selectedType);
                setPropertyTypesDistribution(data);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);


    return (
        <Card className="p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Répartition par typologie</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={propertyTypesDistribution}
                        cx="50%" cy="50%"
                        innerRadius={60} outerRadius={80}
                        paddingAngle={5} dataKey="value"
                    >
                        {propertyTypesDistribution.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => value.toLocaleString('fr-FR')}/>
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};
