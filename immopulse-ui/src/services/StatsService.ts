import api from "./api.ts";
import { toast } from 'react-toastify';
import type {
    KpiStats, PropertyTypeDistribution, PropertyMarketDynamics, ScatterDataPoint, AreaDataPoint,
    DepartmentBarData, HistoryDataPoint
} from "../types/property.ts";
import { getdepartmentName } from "./GeoService.ts";

const BASE_URL = '/stats';

const cache = new Map<string, any>();

export const getKpiStats = async (selectedDept: string, selectedType: string): Promise<KpiStats> => {
    const cacheKey = `kpi_${selectedDept}_${selectedType}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<KpiStats>(`${BASE_URL}/global?department=${selectedDept}&propertyType=${selectedType}`);
        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error) {
        toast.error("Erreur lors de la récupération des statistiques ! 😥");
        throw error;
    }
}

export const getPropertyTypesDistribution = async (selectedDept: string, selectedType: string): Promise<PropertyTypeDistribution[]> => {
    const cacheKey = `dist_${selectedDept}_${selectedType}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<PropertyTypeDistribution[]>(`${BASE_URL}/property-distribution?department=${selectedDept}&propertyType=${selectedType}`);
        cache.set(cacheKey, response.data);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }
}

export const getPropertyMarkets = async (selectedDept: string, selectedType: string): Promise<PropertyMarketDynamics[]> => {
    const cacheKey = `markets_${selectedDept}_${selectedType}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<PropertyMarketDynamics[]>(`${BASE_URL}/market-stats?department=${selectedDept}&propertyType=${selectedType}`);
        cache.set(cacheKey, response.data);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }
}

export const getScatterData = async (selectedDept: string, selectedType: string): Promise<ScatterDataPoint[]> => {
    const cacheKey = `scatter_${selectedDept}_${selectedType}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<any[]>(`${BASE_URL}/price-surface?department=${selectedDept}&propertyType=${selectedType}`);
        const data = response.data;

        const formattedData = await Promise.all(
            data.map(async (item: any) => ({
                surface: item.surface,
                prix: item.prix,
                type: item.type,
                ville: await getdepartmentName(item.departmentCode),
            }))
        );
        cache.set(cacheKey, formattedData);
        return formattedData;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}

export const getAreaData = async (selectedDept: string, selectedType: string): Promise<AreaDataPoint[]> => {
    const cacheKey = `area_${selectedDept}_${selectedType}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<any[]>(`${BASE_URL}/volume-evolution?department=${selectedDept}&propertyType=${selectedType}`);
        cache.set(cacheKey, response.data);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}

export const getDepartmentBarData = async (selectedDept: string, selectedType: string): Promise<DepartmentBarData[]> => {
    const cacheKey = `deptBar_${selectedDept}_${selectedType}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<any[]>(`${BASE_URL}/department-volume?department=${selectedDept}&propertyType=${selectedType}`);
        const data = response.data;

        const formattedData = await Promise.all(
            data.map(async (item: any) => ({
                code: item.departmentCode,
                volume: item.volume,
                nom: await getdepartmentName(item.departmentCode),
            }))
        );
        cache.set(cacheKey, formattedData);
        return formattedData;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}

export const getHistory = async (): Promise<HistoryDataPoint[]> => {
    const cacheKey = `history`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
        const response = await api.get<HistoryDataPoint[]>(`${BASE_URL}/department-table`);
        const data = response.data;
        
        const formattedData = await Promise.all(
            data.map(async (item: any) => ({
               ...item,
                departementName: await getdepartmentName(item.departmentCode),
            }))
        );
        
        cache.set(cacheKey, formattedData);
        return formattedData; 
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de palmarès ! 😥");
        throw error;
    }
}