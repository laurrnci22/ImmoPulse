import type { FC, ElementType } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../ui/card.tsx";

interface KpiItemProps {
    title: string;
    value: string | number;
    icon: ElementType;       // Permet de passer un composant Lucide (ex: BarChart3)
    iconColorClass: string;  // Ex: "text-blue-600"
    iconBgClass: string;     // Ex: "bg-blue-50"
    trendValue: string;      // Ex: "+2.4%" ou "Global"
    trendDirection?: "up" | "down" | "neutral"; // Définit la couleur et l'icône de tendance
}

export const KpiItem: FC<KpiItemProps> = ({
                                              title,
                                              value,
                                              icon: Icon,
                                              iconColorClass,
                                              iconBgClass,
                                              trendValue,
                                              trendDirection = "neutral"
                                          }) => {
    const isUp = trendDirection === "up";
    const isDown = trendDirection === "down";

    const trendTextColor = isUp
        ? "text-green-600"
        : isDown
            ? "text-red-600"
            : "text-gray-500";


    const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : null;

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
                {/* Icône principale avec couleurs dynamiques */}
                <div className={`p-3 rounded-lg ${iconBgClass}`}>
                    <Icon className={`size-6 ${iconColorClass}`}/>
                </div>

                {/* Badge de tendance */}
                <div className={`flex items-center gap-1 ${trendTextColor}`}>
                    {TrendIcon && <TrendIcon className="size-4"/>}
                    <span className="text-sm font-medium">{trendValue}</span>
                </div>
            </div>

            {/* Textes */}
            <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </Card>
    );
};
