import api from "./api.ts";
import { toast } from 'react-toastify';
import type {Departement} from "../models/LandTransaction.ts";
import type {KpiStats, PropertyTypeDistribution} from "../types/property.ts";

const BASE_URL = '/land-transaction';


export const getDepartements = async (): Promise<Departement[]> => {
    try {
     //  const response = await api.get<Departement>(`${BASE_URL}/departements`);
        const mockDepartements: Departement[] = [
            { label: 'Ain', code: 1 },
            { label: 'Aisne', code: 2 },
            { label: 'Allier', code: 3 },
            { label: 'Alpes-de-Haute-Provence', code: 4 },
            { label: 'Hautes-Alpes', code: 5 },
            { label: 'Alpes-Maritimes', code: 6 }
        ];

        return mockDepartements;
    } catch (error) {
        toast.error("Erreur lors de la récupération des départements ! 😥");
        throw error;
    }
};

export const getPropertyTypes = async (): Promise<string[]> => {
    try {
        // const response = await api.get<string[]>(`${BASE_URL}/property-types`);
        const mockPropertyTypes: string[] = [
            'Maison',
            'Appartement',
            'Terrain',
            'Local commercial',
            'Bureau'
        ];

        return mockPropertyTypes;
    } catch (error) {
        toast.error("Erreur lors de la récupération des types de propriétés ! 😥");
        throw error;
    }
}

export const getPeriods = async (): Promise<string[]> => {
    try {
        // const response = await api.get<string[]>(`${BASE_URL}/periods`);
        const mockPeriods: string[] = [
            '2020',
            '2021',
            '2022',
            '2023',
            '2024'
        ];

        return mockPeriods;
    } catch (error) {
        toast.error("Erreur lors de la récupération des périodes ! 😥");
        throw error;
    }
}


export const getKpiStats = async (selectedDept, selectedType, selectedPeriod): Promise<KpiStats> => {
    try {
        // const response = await api.get<KpiStats>(`${BASE_URL}/stats?kpi=true&departement=${selectedDept}&propertyType=${selectedType}&period=${selectedPeriod}`);
        const mockKpiStats: KpiStats = {
            totalTransactions: { value: 150, trendValue: "+5.2%", up: true },
            avgPricePerSqm: { value: 2500, trendValue: "+3.8%", up: true },
            avgPrice: { value: 350000, trendValue: "+4.1%", up: true },
            totalVolume: { value: 52500000, trendValue: "+6.0%", up: true }
        };

        return mockKpiStats;
    } catch (error) {
        toast.error("Erreur lors de la récupération des statistiques ! 😥");
        throw error;
    }
}


export const getPropertyTypesDistribution = async (selectedDept, selectedType, selectedPeriod): Promise<PropertyTypeDistribution[]> => {
    try{
        const mockDatas : PropertyTypeDistribution[] = [
            {name: "appartement", value: 45000},
            {name: "maison", value: 38000},
            {name: "terrain", value: 12000},
            {name: "local commercial", value: 5000},
        ];

        return mockDatas;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }

}

export class LandTransactionService {
    static async getLandTransactions(page: number = 0, size: number = 100) {
        try {
            const response = await api.get(`${BASE_URL}?page=${page}&size=${size}`);
            return response.data;

        } catch (error) {
            toast.error("Erreur lors de la récupération des transactions foncières ! 😥");
            throw error;
        }
    }

    static async getGlobalStats(departement: number | null) {
        try {
            const response = await api.get(`${BASE_URL}/stats/global`);
            return response.data;

        } catch (error) {
            toast.error("Erreur lors de la récupération des statistiques ! 😥");
            throw error;
        }
    }

    static async getMarketMonthlyStats() {
        try {
            const response = await api.get(`${BASE_URL}/stats/monthly`);
            return response.data;

        } catch (error) {
            toast.error("Erreur lors de la récupération des statistiques mensuelles ! 😥");
            throw error;
        }
    }

    static async getMonthlyStatsWithAvgPricePerSqm() {
        try {
            const response = await api.get(`${BASE_URL}/stats/price-monthly`);
            return response.data;

        } catch (error) {
            toast.error("Erreur lors de la récupération des prix statistiques mensuelles ! 😥");
            throw error;
        }
    }

    static async getDepartmentStats() {
        try {
            const response = await api.get(`${BASE_URL}/stats/department`);
            return response.data;

        } catch (error) {
            toast.error("Erreur lors de la récupération des statistiques departments ! 😥");
            throw error;
        }
    }
}
