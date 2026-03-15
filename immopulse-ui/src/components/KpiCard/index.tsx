import {Activity, BarChart3, EuroIcon, Home} from "lucide-react";
import { type FC, useEffect, useState } from "react";
import {KpiItem} from "./kpiItem.tsx";
import type {KpiStats} from "../../types/property.ts";
import {getKpiStats} from "../../services/StatsService.ts";

interface KpiCardProps {
    selectedDept: string;
    selectedType: string;
}

const KpiCard: FC<KpiCardProps> = ({
                                                       selectedDept,
                                                       selectedType,
                                                   }) => {
    const [stats, setStats] = useState<KpiStats>({
        totalTransactions: 0,
        avgPricePerSqm: 0,
        avgPrice: 0,
        totalVolume: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getKpiStats(selectedDept, selectedType);
                const formattedData: KpiStats = {
                    totalTransactions: data.totalTransactions,
                    avgPricePerSqm: data.avgPricePerSqm,
                    avgPrice: data.avgPrice,
                    totalVolume: data.totalVolume
                };
                setStats(formattedData);
            } catch (error) {
                console.error("Erreur de chargement des données statistiques", error);
            }
        };
        fetchStats();
    }, [selectedDept, selectedType]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiItem
                title="Transactions totales"
                value={`${(stats.totalTransactions / 1000000).toFixed(2)}M`}
                icon={BarChart3}
                iconColorClass="text-blue-600"
                iconBgClass="bg-blue-50"
                trendValue="Global"
            />

            <KpiItem
                title="Prix moyen au m²"
                value={`${stats.avgPricePerSqm.toLocaleString('fr-FR')} €/m²`}
                icon={Home}
                iconColorClass="text-purple-600"
                iconBgClass="bg-purple-50"
                trendValue="Global"
            />

            <KpiItem
                title="Valeur médiane"
                value={`${(stats.avgPrice / 1000).toFixed(0)}K €`}
                icon={EuroIcon}
                iconColorClass="text-indigo-600"
                iconBgClass="bg-indigo-50"
                trendValue="Global"
            />

            <KpiItem
                title="Volume total"
                value={`${(stats.totalVolume / 1000000000).toFixed(0)}Md €`}
                icon={Activity}
                iconColorClass="text-emerald-600"
                iconBgClass="bg-emerald-50"
                trendValue="Global"
                trendDirection="neutral"
            />
        </div>
    );
};

export default KpiCard;
