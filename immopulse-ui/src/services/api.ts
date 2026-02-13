import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL as string;
const BASE_URL = `${apiURL}`;

// Configuration d'Axios avec les cookies activés
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json', // S'assurer du bon format
        Accept: 'application/json',
    },
});

export default api;