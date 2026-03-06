import api from "./api.ts";
import { toast } from 'react-toastify';
import type {Departement} from "../models/LandTransaction.ts";

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



export class LandTransactionService {
    static async getLandTransactions(page: number = 0, size: number = 100, searchTerm?: string) {
        try {
            const url = searchTerm != "" ? `${BASE_URL}/search?term=${searchTerm}&${page}&size=${size}` : `${BASE_URL}?page=${page}&size=${size}`;
            const response = await api.get(url);

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
