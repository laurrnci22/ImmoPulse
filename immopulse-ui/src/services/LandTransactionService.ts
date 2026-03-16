import api from "./api.ts";
import { toast } from 'react-toastify';

const BASE_URL = '/land-transaction';


export const getDepartements = async (): Promise<string[]> => {
    try {
       const response = await api.get<string[]>(`${BASE_URL}/all-departments`);
        return response.data;
    } catch (error) {
        toast.error("Erreur lors de la récupération des départements ! 😥");
        throw error;
    }
};

export const getPropertyTypes = async (): Promise<string[]> => {
    try {
        const response = await api.get<string[]>(`${BASE_URL}/all-property-types`);
        return response.data;
    } catch (error) {
        toast.error("Erreur lors de la récupération des types de propriétés ! 😥");
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

    static async searchWithFilters(filters: {
        type: string;
        department: string;
        minPrice: number;
        maxPrice: number;
        minSurface: number;
    }, page: number = 0, size: number = 20) {
        try {
            const body: any = {
                type: filters.type,
                department: filters.department,
                minSurface: filters.minSurface,
                page,
                size,
            };

            if (filters.minPrice > 0) body.minPrice = filters.minPrice;
            if (filters.maxPrice < 5000000) body.maxPrice = filters.maxPrice;

            const response = await api.post(`${BASE_URL}/search-filters`, body);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la recherche filtrée ! 😥");
            throw error;
        }
    }

    static async getGlobalStats() {
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
