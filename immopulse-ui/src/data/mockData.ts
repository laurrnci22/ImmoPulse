import type {Property, DepartmentStats, MonthlyStats, MarketStats} from '../types/property';

// Mock properties data
export const mockProperties: Property[] = [
  {
    id: '1',
    type: 'Appartement',
    price: 450000,
    surface: 85,
    pricePerSqm: 5294,
    address: '12 Rue de la République',
    postalCode: '75001',
    city: 'Paris',
    department: 'Paris',
    departmentCode: '75',
    rooms: 3,
    saleDate: '2025-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1640109229792-a26a0ee366ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3Njk4ODgwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Bel appartement lumineux au cœur de Paris, proche des commerces et transports.'
  },
  {
    id: '2',
    type: 'Maison',
    price: 680000,
    surface: 150,
    pricePerSqm: 4533,
    address: '45 Avenue des Champs',
    postalCode: '69001',
    city: 'Lyon',
    department: 'Rhône',
    departmentCode: '69',
    rooms: 5,
    saleDate: '2025-01-10',
    imageUrl: 'https://images.unsplash.com/photo-1664813954641-1ffcb7b55fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk4ODgwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Magnifique maison avec jardin dans un quartier calme et résidentiel.'
  },
  {
    id: '3',
    type: 'Appartement',
    price: 320000,
    surface: 65,
    pricePerSqm: 4923,
    address: '8 Boulevard Victor Hugo',
    postalCode: '13001',
    city: 'Marseille',
    department: 'Bouches-du-Rhône',
    departmentCode: '13',
    rooms: 2,
    saleDate: '2025-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2OTg2MDIwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Appartement rénové avec vue mer, proche du centre-ville.'
  },
  {
    id: '4',
    type: 'Maison',
    price: 520000,
    surface: 120,
    pricePerSqm: 4333,
    address: '23 Rue Nationale',
    postalCode: '31000',
    city: 'Toulouse',
    department: 'Haute-Garonne',
    departmentCode: '31',
    rooms: 4,
    saleDate: '2025-01-12',
    imageUrl: 'https://images.unsplash.com/photo-1664813954641-1ffcb7b55fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk4ODgwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Maison de ville avec terrasse, idéale pour une famille.'
  },
  {
    id: '5',
    type: 'Appartement',
    price: 280000,
    surface: 55,
    pricePerSqm: 5091,
    address: '67 Rue de la Liberté',
    postalCode: '44000',
    city: 'Nantes',
    department: 'Loire-Atlantique',
    departmentCode: '44',
    rooms: 2,
    saleDate: '2025-01-18',
    imageUrl: 'https://images.unsplash.com/photo-1640109229792-a26a0ee366ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3Njk4ODgwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Appartement moderne dans un immeuble récent, proche des transports.'
  },
  {
    id: '6',
    type: 'Maison',
    price: 750000,
    surface: 180,
    pricePerSqm: 4167,
    address: '34 Avenue de la Paix',
    postalCode: '33000',
    city: 'Bordeaux',
    department: 'Gironde',
    departmentCode: '33',
    rooms: 6,
    saleDate: '2025-01-08',
    imageUrl: 'https://images.unsplash.com/photo-1664813954641-1ffcb7b55fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk4ODgwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Grande maison avec piscine et jardin arboré dans un quartier prisé.'
  }
];

// Mock department statistics
export const mockDepartmentStats: DepartmentStats[] = [
  { departmentCode: '75', departmentName: 'Paris', avgPricePerSqm: 10580, totalSales: 45230, avgPrice: 565000, priceEvolution: 3.2 },
  { departmentCode: '92', departmentName: 'Hauts-de-Seine', avgPricePerSqm: 7340, totalSales: 28450, avgPrice: 485000, priceEvolution: 2.8 },
  { departmentCode: '69', departmentName: 'Rhône', avgPricePerSqm: 4850, totalSales: 35680, avgPrice: 380000, priceEvolution: 4.5 },
  { departmentCode: '13', departmentName: 'Bouches-du-Rhône', avgPricePerSqm: 4120, totalSales: 42150, avgPrice: 320000, priceEvolution: 3.7 },
  { departmentCode: '31', departmentName: 'Haute-Garonne', avgPricePerSqm: 3890, totalSales: 31240, avgPrice: 295000, priceEvolution: 5.2 },
  { departmentCode: '33', departmentName: 'Gironde', avgPricePerSqm: 4250, totalSales: 29870, avgPrice: 340000, priceEvolution: 4.1 },
  { departmentCode: '44', departmentName: 'Loire-Atlantique', avgPricePerSqm: 3650, totalSales: 26540, avgPrice: 280000, priceEvolution: 4.8 },
  { departmentCode: '59', departmentName: 'Nord', avgPricePerSqm: 2850, totalSales: 38920, avgPrice: 215000, priceEvolution: 2.3 },
  { departmentCode: '06', departmentName: 'Alpes-Maritimes', avgPricePerSqm: 5230, totalSales: 24680, avgPrice: 420000, priceEvolution: 2.9 },
  { departmentCode: '67', departmentName: 'Bas-Rhin', avgPricePerSqm: 3420, totalSales: 22150, avgPrice: 265000, priceEvolution: 3.5 },
];

// Mock monthly statistics for the last 12 months
export const mockMonthlyStats: MonthlyStats[] = [
  { month: 'Fév 2024', sales: 125430, avgPrice: 345000, avgPricePerSqm: 4250 },
  { month: 'Mar 2024', sales: 142560, avgPrice: 352000, avgPricePerSqm: 4320 },
  { month: 'Avr 2024', sales: 138920, avgPrice: 348000, avgPricePerSqm: 4290 },
  { month: 'Mai 2024', sales: 156780, avgPrice: 355000, avgPricePerSqm: 4380 },
  { month: 'Juin 2024', sales: 168540, avgPrice: 358000, avgPricePerSqm: 4410 },
  { month: 'Juil 2024', sales: 145230, avgPrice: 360000, avgPricePerSqm: 4450 },
  { month: 'Aoû 2024', sales: 132450, avgPrice: 362000, avgPricePerSqm: 4470 },
  { month: 'Sep 2024', sales: 158690, avgPrice: 365000, avgPricePerSqm: 4510 },
  { month: 'Oct 2024', sales: 162340, avgPrice: 368000, avgPricePerSqm: 4540 },
  { month: 'Nov 2024', sales: 149820, avgPrice: 371000, avgPricePerSqm: 4580 },
  { month: 'Déc 2024', sales: 138560, avgPrice: 373000, avgPricePerSqm: 4610 },
  { month: 'Jan 2025', sales: 145670, avgPrice: 376000, avgPricePerSqm: 4650 },
];

// Mock market overview stats
export const mockMarketStats: MarketStats = {
  totalTransactions: 1824990,
  avgPricePerSqm: 4650,
  avgPrice: 376000,
  totalVolume: 686355240000, // in euros
  yearOverYearChange: 3.8
};
