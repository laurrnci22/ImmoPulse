export interface Property {
  id: string;
  type: 'Maison' | 'Appartement' | 'Terrain' | 'Local commercial';
  price: number;
  surface: number;
  pricePerSqm: number;
  address: string;
  postalCode: string;
  city: string;
  department: string;
  departmentCode: string;
  rooms?: number;
  saleDate: string;
  imageUrl: string;
  description?: string;
}

export interface DepartmentStats {
  departmentCode: string;
  avgPricePerSqm: number;
  totalSales: number;
  avgPrice: number;
  priceEvolution: number;
}

export interface MonthlyStats {
  month: string;
  sales: number;
  avgPrice: number;
  avgPricePerSqm: number;
}

export interface MarketStats {
  totalTransactions: number;
  avgPricePerSqm: number;
  avgPrice: number;
  totalVolume: number;
  yearOverYearChange: number;
}


export interface KpiStats {
  totalTransactions: number;
  avgPricePerSqm: number;
  avgPrice: number;
  totalVolume: number;
}

export interface KpiItem {
  value: number;
  trendValue: string;
  up?: boolean;
}

export interface MarketPriceStats {
  month: string;
  sales: number;
  avgPricePerSqm: number;
}

export interface PropertyTypeDistribution {
  name: string;
  value: number;
}

export interface PropertyMarketDynamics {
  month: string;
  volumeVentes: number;
  prixMoyen: number;
}

export interface ScatterDataPoint {
  surface: number;
  prix: number;
  type: string;
  ville: string;
}

export interface AreaDataPoint {
  month: string;
  appartement: number;
  maison: number;
  terrain: number;
}

export interface DepartmentBarData {
  code: string;
  nom: string;
  volume: number;
}

export interface HistoryDataPoint {
  departmentCode: string;
  avgPricePerSqm: number;
  avgPrice: number;
  totalSales: number;
  priceEvolution: number;
}