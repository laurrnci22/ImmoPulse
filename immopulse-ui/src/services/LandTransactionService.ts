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
}