import { Filter } from "lucide-react";
import { Card } from "../ui/card.tsx";
import { type FC, useEffect, useState } from "react";
import {getDepartements, getPropertyTypes} from "../../services/LandTransactionService.ts";
import type { Departement } from '../../types/property.ts';

interface AnalyticsFilterProps {
    selectedDept: string;
    onDeptChange: (dept: string) => void;

    selectedType: string;
    onTypeChange: (type: string) => void;
}

const AnalyticsFilter: FC<AnalyticsFilterProps> = ({
                                                       selectedDept,
                                                       onDeptChange,
                                                       selectedType,
                                                       onTypeChange
                                                   }) => {
    const [departements, setDepartements] = useState<Departement[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

    useEffect(() => {
        const fetchDepart = async () => {
            try {
                const data = await getDepartements();
                setDepartements(data);
            } catch (error) {
                console.error("Erreur lors du chargement des départements", error);
            }
        };

        const fetchPropertyTypes = async () => {
            try{
                const data = await getPropertyTypes();
                setPropertyTypes(data);
            } catch(error){
                console.error("Erreur lors du chargement des types de propriétés", error);
            }
        }

        fetchDepart();
        fetchPropertyTypes();
    }, []);

    return (
        <Card className="p-4 bg-gray-50 border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-2 text-gray-700 font-medium min-w-max">
                    <Filter className="size-5" />
                    <span>Filtres :</span>
                </div>

                <select
                    className="p-2 border rounded-md bg-white flex-1 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedDept}
                    onChange={(e) => onDeptChange(e.target.value)}
                >
                    <option value="all">Tous les départements</option>
                    {departements.map((dept) => (
                        <option key={dept.code} value={dept.code}>
                            {dept.name}
                        </option>
                    ))}
                </select>

                <select
                    className="p-2 border rounded-md bg-white flex-1 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}
                >
                    <option value="all">Toutes typologies</option>
                    {propertyTypes.map((type) => (
                        <option key={type} value={type.toLowerCase()}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </Card>
    );
};

export default AnalyticsFilter;
