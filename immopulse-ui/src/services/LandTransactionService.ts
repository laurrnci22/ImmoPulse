import api from "./api.ts";
import { toast } from 'react-toastify';
import type {
    Departement
} from "../types/property.ts";
import { getdepartmentName } from "./GeoService.ts";
const BASE_URL = '/land-transaction';
const cache = new Map<string, any>();

export const getDepartements = async (): Promise<Departement[]> => {
    const cacheKey = 'departments';
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<string[]>(`${BASE_URL}/all-departments`);
        const data = response.data;

        const formattedData = await Promise.all(
            data.map(async (item: string) => ({
                code: item,
                name: await getdepartmentName(item),
            }))
        );
        cache.set(cacheKey, formattedData);
        return formattedData;

    } catch (error) {
        toast.error("Erreur lors de la récupération des départements ! 😥");
        throw error;
    }
};

export const getPropertyTypes = async (): Promise<string[]> => {
    const cacheKey = 'propertyTypes';
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<string[]>(`${BASE_URL}/all-property-types`);
        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error) {
        toast.error("Erreur lors de la récupération des types de propriétés ! 😥");
        throw error;
    }
}

export class LandTransactionService {
    static async getLandTransactions(page: number = 0, size: number = 100, searchTerm?: string) {
        const cacheKey = `transactions_${page}_${size}_${searchTerm || ''}`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const url = searchTerm != "" 
                ? `${BASE_URL}/search?term=${searchTerm}&page=${page}&size=${size}` 
                : `${BASE_URL}?page=${page}&size=${size}`;
            const response = await api.get(url);
            
            cache.set(cacheKey, response.data);
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
        const cacheKey = `searchFilters_${JSON.stringify(filters)}_${page}_${size}`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

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
            cache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la recherche filtrée ! 😥");
            throw error;
        }
    }

    static async getGlobalStats() {
        const cacheKey = `stats_global`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await api.get(`${BASE_URL}/stats/global`);
            cache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la récupération des statistiques ! 😥");
            throw error;
        }
    }

    static async getMarketMonthlyStats() {
        const cacheKey = `stats_monthly`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await api.get(`${BASE_URL}/stats/monthly`);
            cache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la récupération des statistiques mensuelles ! 😥");
            throw error;
        }
    }

    static async getMonthlyStatsWithAvgPricePerSqm() {
        const cacheKey = `stats_price_monthly`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await api.get(`${BASE_URL}/stats/price-monthly`);
            cache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la récupération des prix statistiques mensuelles ! 😥");
            throw error;
        }
    }

    static async getDepartmentStats() {
        const cacheKey = `stats_department`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await api.get(`${BASE_URL}/stats/department`);
            cache.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors de la récupération des statistiques departments ! 😥");
            throw error;
        }
    }
}