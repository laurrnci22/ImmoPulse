import api from "./api.ts";
import { toast } from 'react-toastify';

const BASE_URL = '/land-transaction';

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