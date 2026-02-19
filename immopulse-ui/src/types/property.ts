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

export interface MarketPriceStats {
  month: string;
  sales: number;
  avgPricePerSqm: number;
}
