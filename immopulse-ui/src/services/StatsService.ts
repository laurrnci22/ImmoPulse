import api from "./api.ts";
import { toast } from 'react-toastify';
import type {KpiStats, PropertyTypeDistribution, PropertyMarketDynamics, ScatterDataPoint, AreaDataPoint
    , DepartmentBarData, HistoryDataPoint} from "../types/property.ts";
import {getdepartmentName} from "./GeoService.ts";

const BASE_URL = '/stats';

export const getKpiStats = async (selectedDept: string, selectedType : string): Promise<KpiStats> => {
    try {
        const response = await api.get<KpiStats>(`${BASE_URL}/global?department=${selectedDept}&propertyType=${selectedType}`);
        return response.data;
    } catch (error) {
        toast.error("Erreur lors de la récupération des statistiques ! 😥");
        throw error;
    }
}

export const getPropertyTypesDistribution = async (selectedDept: string, selectedType: string): Promise<PropertyTypeDistribution[]> => {
    try{
        const response = await api.get<PropertyTypeDistribution[]>(`${BASE_URL}/property-distribution?department=${selectedDept}&propertyType=${selectedType}`);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }
}

export const getPropertyMarkets = async (selectedDept: string, selectedType: string): Promise<PropertyMarketDynamics[]> => {
    try{
        const response = await api.get<PropertyMarketDynamics[]>(`${BASE_URL}/market-stats?department=${selectedDept}&propertyType=${selectedType}`);
       return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }
}


export const getScatterData = async (selectedDept: string, selectedType: string): Promise<ScatterDataPoint[]> => {
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
        return formattedData;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}


export const getAreaData = async (selectedDept: string, selectedType: string): Promise<AreaDataPoint[]> => {
    try{
        const response = await api.get<any[]>(`${BASE_URL}/volume-evolution?department=${selectedDept}&propertyType=${selectedType}`);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}

export const getDepartmentBarData = async (selectedDept: string, selectedType: string): Promise<DepartmentBarData[]> => {
    try{
        const response = await api.get<any[]>(`${BASE_URL}/department-volume?department=${selectedDept}&propertyType=${selectedType}`);
       const data = response.data;

        const formattedData = await Promise.all(
            data.map(async (item: any) => ({
                code: item.departmentCode,
                volume: item.volume,
                nom: await getdepartmentName(item.departmentCode),
            }))
        );
        return formattedData;

    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}

export const getHistory = async (): Promise<HistoryDataPoint[]> => {
    try{
        const response = await api.get<HistoryDataPoint[]>(`${BASE_URL}/department-table`);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}
