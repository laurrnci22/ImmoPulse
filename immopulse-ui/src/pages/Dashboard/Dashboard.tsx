import React, {useEffect, useState} from 'react';
import {Card} from '../../components/ui/card.tsx';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';
import AnalyticsFilter from "../../components/AnalyticsFilter";
import KpiCard from "../../components/KpiCard";
import {PieChartComponent} from "../../components/Chart/pieChart.tsx";
import ComposedChartCard from "../../components/ComposedChartCard";
import ScatterChartCard from "../../components/ScatterChartCard";
import AreaChartCard from "../../components/AreaChartCard";
import BarChartCard from "../../components/BarChartCard";
import HistoryCard from '../../components/HistoryCard';

export function Dashboard() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedDept, setSelectedDept] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('2023');
   


  useEffect(() => {

    const fetchStats = async () => {
      try {

        /*  const departement: number | null = selectedDept !== 'all' ? parseInt(selectedDept) : null;

        const data = await LandTransactionService.getGlobalStats(departement);
        const formattedData: MarketStats = {
          totalTransactions: data.totalTransactions,
          avgPricePerSqm: data.avgPricePerSqm,
          avgPrice: data.avgPrice,
          totalVolume: data.totalVolume,
          yearOverYearChange: data.yearOverYearChange,
        };*/

     /*   setStats(formattedData);

        const monthly = await LandTransactionService.getMarketMonthlyStats();
        setMonthlyStats(monthly);

        const priceMonthly = await LandTransactionService.getMonthlyStatsWithAvgPricePerSqm();
        setPriceAvgPerSqm(priceMonthly);

        const departmentStats = await LandTransactionService.getDepartmentStats();
        setDepartmentStats(departmentStats); */

      } catch (error) {
        console.error("Erreur de chargement des données statistiques", error);
      }
    };

    fetchStats();
  }, []);



    // Simulation de chargement lors d'un changement de filtre
    useEffect(() => {
       /* setIsLoading(true);
        const timer = setTimeout(() => {
            console.log("Appel API simulé avec filtres :", {selectedDept, selectedType, selectedPeriod});
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);*/

        setIsLoading(false);
    }, [selectedDept, selectedType, selectedPeriod]);

    // Gestionnaire pour cacher/afficher les séries du AreaChart
  
   

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Tableau de bord analytique DVF</h1>
                <p className="text-gray-600">Analyse interactive du marché immobilier français</p>
            </div>

            {/* BARRE DE FILTRES GLOBALE */}
            <AnalyticsFilter
                selectedDept={selectedDept} onDeptChange={setSelectedDept}
                selectedType={selectedType} onTypeChange={setSelectedType}
            />


            {/* CHARGEMENT vs CONTENU */}
            {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-4">
                    <div
                        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 animate-pulse">Rechargement des données...</p>
                </div>
            ) : (
                <>
                    {/* KPI CARDS */}
                    <KpiCard
                        selectedDept={selectedDept}
                        selectedType={selectedType}
                    />

                    {/* ROW 1: Pie Chart & Composed Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {selectedDept === 'all' && selectedType === 'all' ? (
                            <PieChartComponent
                                selectedDept={selectedDept}
                                selectedType={selectedType}
                            />
                        ) : (
                            <></>
                       )}

                        <ComposedChartCard 
                            selectedDept={selectedDept}
                            selectedType={selectedType} />
                    </div>

                    {/* ROW 2: Interactive Scatter & Stacked Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ScatterChartCard  selectedDept={selectedDept}
                            selectedType={selectedType} />
                        

                        <AreaChartCard selectedDept={selectedDept}
                            selectedType={selectedType} />
                    </div>

                    {/* ROW 3: Interactive BarChart Drill-Down */}
                    <BarChartCard selectedDept={selectedDept} selectedType={selectedType} />

                    {/* ROW 4: Data Table */}
                    <HistoryCard />

                </>
            )}

            {/* FOOTER: Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-2">Source des données</h3>
                <p className="text-sm text-blue-800">
                    Demandes de valeurs foncières (DVF) - Données publiques officielles.
                </p>
            </div>
        </div>
    );
}
