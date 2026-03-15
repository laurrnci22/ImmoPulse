import api from "./api.ts";
import { toast } from 'react-toastify';
import type {KpiStats, PropertyTypeDistribution, PropertyMarketDynamics, ScatterDataPoint, AreaDataPoint
    , DepartmentBarData, HistoryDataPoint} from "../types/property.ts";

const BASE_URL = '/stats';

export const getKpiStats = async (selectedDept: string, selectedType : string): Promise<KpiStats> => {
    try {
        const response = await api.get<KpiStats>(`${BASE_URL}/global?departement=${selectedDept}&propertyType=${selectedType}`);
        return response.data;
    } catch (error) {
        toast.error("Erreur lors de la récupération des statistiques ! 😥");
        throw error;
    }
}

export const getPropertyTypesDistribution = async (selectedDept: string, selectedType: string): Promise<PropertyTypeDistribution[]> => {
    try{
        const response = await api.get<PropertyTypeDistribution[]>(`${BASE_URL}/property-distribution?departement=${selectedDept}&propertyType=${selectedType}`);
        return response.data;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }
}

const MOCK_MARKET_DYNAMICS = [
    {month: 'Jan', volumeVentes: 14000, prixMoyen: 2800},
    {month: 'Fév', volumeVentes: 3000, prixMoyen: 2850},
    {month: 'Mar', volumeVentes: 5500, prixMoyen: 2900},
    {month: 'Avr', volumeVentes: 6000, prixMoyen: 2950},
    {month: 'Mai', volumeVentes: 7000, prixMoyen: 3000},
    {month: 'Juin', volumeVentes: 8500, prixMoyen: 3100},
];

export const getPropertyMarkets = async (selectedDept: string, selectedType: string): Promise<PropertyMarketDynamics[]> => {
    try{
        //const response = await api.get<PropertyMarketDynamics[]>(`${BASE_URL}/property-distribution?departement=${selectedDept}&propertyType=${selectedType}`);
       // return response.data;
       return MOCK_MARKET_DYNAMICS;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération de la répartition par typologie ! 😥");
        throw error;
    }
}

const MOCK_SCATTER_DATA = [
    {surface: 25, prix: 150000, type: 'Appartement', ville: 'Paris'},
    {surface: 45, prix: 280000, type: 'Appartement', ville: 'Lyon'},
    {surface: 80, prix: 320000, type: 'Maison', ville: 'Bordeaux'},
    {surface: 120, prix: 450000, type: 'Maison', ville: 'Toulouse'},
    {surface: 15, prix: 95000, type: 'Appartement', ville: 'Lille'},
    {surface: 200, prix: 850000, type: 'Maison', ville: 'Cannes'},
    {surface: 60, prix: 220000, type: 'Appartement', ville: 'Marseille'},
    {surface: 90, prix: 400000, type: 'Maison', ville: 'Nantes'},
    {surface: 30, prix: 180000, type: 'Appartement', ville: 'Strasbourg'},
    {surface: 150, prix: 600000, type: 'Maison', ville: 'Nice'},
    {surface: 50, prix: 250000, type: 'Appartement', ville: 'Rennes'},
];

const MOCK_AREA_DATA = [
    {month: 'Jan', appartement: 4000, maison: 10000, terrain: 1000},
    {month: 'Fév', appartement: 3000, maison: 1398, terrain: 800},
    {month: 'Mar', appartement: 2000, maison: 4800, terrain: 1200},
    {month: 'Avr', appartement: 2780, maison: 3908, terrain: 1500},
    {month: 'Mai', appartement: 1890, maison: 4800, terrain: 1700},
    {month: 'Juin', appartement: 2390, maison: 3800, terrain: 2000},
];
export const getScatterData = async (selectedDept: string, selectedType: string): Promise<ScatterDataPoint[]> => {
    try{
      //  const response = await api.get<any[]>(`${BASE_URL}/scatter-data?departement=${selectedDept}&propertyType=${selectedType}`);
      //  return response.data;

      return MOCK_SCATTER_DATA;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}



const MOCK_DEPT_INTERACTIVE = [
    {code: '75', nom: 'Paris', volume: 15000},
    {code: '69', nom: 'Rhône', volume: 12000},
    {code: '33', nom: 'Gironde', volume: 10000},
    {code: '13', nom: 'B.-du-Rhône', volume: 13000},
    {code: '59', nom: 'Nord', volume: 9500},
];

export const getAreaData = async (selectedDept: string, selectedType: string): Promise<AreaDataPoint[]> => {
    try{
        //const response = await api.get<any[]>(`${BASE_URL}/area-data?departement=${selectedDept}&propertyType=${selectedType}`);
        //return response.data;
        return MOCK_AREA_DATA;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}

export const getDepartmentBarData = async (selectedDept: string, selectedType: string): Promise<DepartmentBarData[]> => {
    try{
        //const response = await api.get<any[]>(`${BASE_URL}/department-bar-data?departement=${selectedDept}&propertyType=${selectedType}`);
        //return response.data;
        return MOCK_DEPT_INTERACTIVE;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}


const MOCK_DEPT_TABLE = [
    {departmentCode: '75', avgPricePerSqm: 10200, avgPrice: 450000, totalSales: 15000, priceEvolution: -1.2},
    {departmentCode: '69', avgPricePerSqm: 4800, avgPrice: 320000, totalSales: 12000, priceEvolution: 2.4},
    {departmentCode: '33', avgPricePerSqm: 4500, avgPrice: 310000, totalSales: 10000, priceEvolution: 1.8},
    {departmentCode: '13', avgPricePerSqm: 3900, avgPrice: 280000, totalSales: 13000, priceEvolution: 0.5},
];


export const getHistory = async (): Promise<HistoryDataPoint[]> => {
    try{
        //const response = await api.get<any[]>(`${BASE_URL}/department-bar-data?departement=${selectedDept}&propertyType=${selectedType}`);
        //return response.data;
        return MOCK_DEPT_TABLE;
    }
    catch (error) {
        toast.error("Erreur lors de la récupération des données de dispersion ! 😥");
        throw error;
    }
}
