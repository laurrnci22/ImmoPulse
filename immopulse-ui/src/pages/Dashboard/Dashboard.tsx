import {useEffect, useState} from 'react';
import {Card} from '../../components/ui/card.tsx';
import {Activity, BarChart3, EuroIcon, Filter, Home, TrendingDown, TrendingUp} from 'lucide-react';
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
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from 'recharts';
import type {MarketStats} from "../../types/property.ts";
import {getDepartements, LandTransactionService} from "../../services/LandTransactionService.ts";
import type {Departement} from "../../models/LandTransaction.ts";
import AnalyticsFilter from "../../components/AnalyticsFilter";

// ==========================================
// MOCK DATA (Simulations de l'API Backend)
// ==========================================

const MOCK_PROPERTY_TYPES = [
    {name: 'Appartement', value: 45000},
    {name: 'Maison', value: 38000},
    {name: 'Terrain', value: 12000},
    {name: 'Local Ind.', value: 5000},
];

const MOCK_MARKET_DYNAMICS = [
    {month: 'Jan', volumeVentes: 4000, prixMoyen: 2800},
    {month: 'Fév', volumeVentes: 3000, prixMoyen: 2850},
    {month: 'Mar', volumeVentes: 5500, prixMoyen: 2900},
    {month: 'Avr', volumeVentes: 6000, prixMoyen: 2950},
    {month: 'Mai', volumeVentes: 7000, prixMoyen: 3000},
    {month: 'Juin', volumeVentes: 8500, prixMoyen: 3100},
];

const MOCK_SCATTER_DATA = [
    {surface: 25, prix: 150000, type: 'Appartement', ville: 'Paris'},
    {surface: 45, prix: 280000, type: 'Appartement', ville: 'Lyon'},
    {surface: 80, prix: 320000, type: 'Maison', ville: 'Bordeaux'},
    {surface: 120, prix: 450000, type: 'Maison', ville: 'Toulouse'},
    {surface: 15, prix: 95000, type: 'Appartement', ville: 'Lille'},
    {surface: 200, prix: 850000, type: 'Maison', ville: 'Cannes'},
];

const MOCK_AREA_DATA = [
    {month: 'Jan', appartement: 4000, maison: 2400, terrain: 1000},
    {month: 'Fév', appartement: 3000, maison: 1398, terrain: 800},
    {month: 'Mar', appartement: 2000, maison: 4800, terrain: 1200},
    {month: 'Avr', appartement: 2780, maison: 3908, terrain: 1500},
    {month: 'Mai', appartement: 1890, maison: 4800, terrain: 1700},
    {month: 'Juin', appartement: 2390, maison: 3800, terrain: 2000},
];

const MOCK_DEPT_INTERACTIVE = [
    {code: '75', nom: 'Paris', volume: 15000},
    {code: '69', nom: 'Rhône', volume: 12000},
    {code: '33', nom: 'Gironde', volume: 10000},
    {code: '13', nom: 'B.-du-Rhône', volume: 13000},
    {code: '59', nom: 'Nord', volume: 9500},
];

const MOCK_DEPT_TABLE = [
    {departmentCode: '75', avgPricePerSqm: 10200, avgPrice: 450000, totalSales: 15000, priceEvolution: -1.2},
    {departmentCode: '69', avgPricePerSqm: 4800, avgPrice: 320000, totalSales: 12000, priceEvolution: 2.4},
    {departmentCode: '33', avgPricePerSqm: 4500, avgPrice: 310000, totalSales: 10000, priceEvolution: 1.8},
    {departmentCode: '13', avgPricePerSqm: 3900, avgPrice: 280000, totalSales: 13000, priceEvolution: 0.5},
];

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];



export function Dashboard() {
    // --- ÉTATS GLOBAUX ---
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Filtres globaux
    const [selectedDept, setSelectedDept] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('2023');

    // Filtres interactifs des graphiques
    const [activeDeptChart, setActiveDeptChart] = useState<string | null>(null);
    const [hiddenSeries, setHiddenSeries] = useState<Record<string, boolean>>({});


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
        setIsLoading(true);
        const timer = setTimeout(() => {
            console.log("Appel API simulé avec filtres :", {selectedDept, selectedType, selectedPeriod});
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [selectedDept, selectedType, selectedPeriod]);

    // Gestionnaire pour cacher/afficher les séries du AreaChart
    const toggleSeries = (dataKey: string) => {
        setHiddenSeries(prev => ({...prev, [dataKey]: !prev[dataKey]}));
    };

    // Tooltip personnalisé pour le ScatterChart
    const CustomScatterTooltip = ({active, payload}: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
                    <p className="font-bold text-gray-800">{data.type} à {data.ville}</p>
                    <p className="text-sm text-gray-600">Surface : <span
                        className="font-semibold">{data.surface} m²</span></p>
                    <p className="text-sm text-gray-600">Prix : <span
                        className="font-semibold text-blue-600">{data.prix.toLocaleString('fr-FR')} €</span></p>
                    <p className="text-xs text-gray-400 mt-1">Ratio
                        : {Math.round(data.prix / data.surface).toLocaleString()} €/m²</p>
                </div>
            );
        }
        return null;
    };

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
                selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-50 rounded-lg"><BarChart3 className="size-6 text-blue-600"/>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                    <TrendingUp className="size-4"/>
                                    <span className="text-sm font-medium">+2.4%</span>
                                </div>
                            </div>
                            <h3 className="text-sm text-gray-600 mb-1">Transactions totales</h3>
                            <p className="text-2xl font-bold">100 000</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-50 rounded-lg"><Home className="size-6 text-purple-600"/>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                    <TrendingUp className="size-4"/>
                                    <span className="text-sm font-medium">+4.2%</span>
                                </div>
                            </div>
                            <h3 className="text-sm text-gray-600 mb-1">Prix moyen au m²</h3>
                            <p className="text-2xl font-bold">2 950 €</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-indigo-50 rounded-lg"><EuroIcon
                                    className="size-6 text-indigo-600"/></div>
                                <div className="flex items-center gap-1 text-red-600">
                                    <TrendingDown className="size-4"/>
                                    <span className="text-sm font-medium">-1.5%</span>
                                </div>
                            </div>
                            <h3 className="text-sm text-gray-600 mb-1">Valeur médiane</h3>
                            <p className="text-2xl font-bold">185 K€</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-emerald-50 rounded-lg"><Activity
                                    className="size-6 text-emerald-600"/></div>
                                <span className="text-sm font-medium text-gray-500">Global</span>
                            </div>
                            <h3 className="text-sm text-gray-600 mb-1">Surface médiane</h3>
                            <p className="text-2xl font-bold">65 m²</p>
                        </Card>
                    </div>

                    {/* ROW 1: Pie Chart & Composed Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="p-6 lg:col-span-1">
                            <h2 className="text-lg font-semibold mb-4">Répartition par typologie</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={MOCK_PROPERTY_TYPES}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={80}
                                        paddingAngle={5} dataKey="value"
                                    >
                                        {MOCK_PROPERTY_TYPES.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]}/>
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => value.toLocaleString('fr-FR')}/>
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className="p-6 lg:col-span-2">
                            <h2 className="text-lg font-semibold mb-2">Dynamique : Volume vs Prix</h2>
                            <p className="text-xs text-gray-500 mb-4">Corrélation entre l'offre/demande et l'évolution
                                des prix.</p>
                            <ResponsiveContainer width="100%" height={300}>
                                <ComposedChart data={MOCK_MARKET_DYNAMICS}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0"/>
                                    <XAxis dataKey="month" tick={{fontSize: 12}}/>
                                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6"/>
                                    <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6"
                                           domain={['auto', 'auto']}/>
                                    <Tooltip contentStyle={{borderRadius: '8px'}}/>
                                    <Legend/>
                                    <Bar yAxisId="left" dataKey="volumeVentes" name="Volume" fill="#3b82f6"
                                         radius={[4, 4, 0, 0]}/>
                                    <Line yAxisId="right" type="monotone" dataKey="prixMoyen" name="Prix/m² (€)"
                                          stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}}/>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>

                    {/* ROW 2: Interactive Scatter & Stacked Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-2">Analyse Prix / Surface</h2>
                            <p className="text-xs text-gray-500 mb-4">Détection de décote (survolez pour les
                                détails).</p>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.5}/>
                                    <XAxis type="number" dataKey="surface" name="Surface" unit=" m²"/>
                                    <YAxis type="number" dataKey="prix" name="Prix" unit=" €"
                                           tickFormatter={(val) => `${val / 1000}k`}/>
                                    <ZAxis type="category" dataKey="type" name="Type"/>
                                    <Tooltip content={<CustomScatterTooltip/>} cursor={{strokeDasharray: '3 3'}}/>
                                    <Scatter name="Transactions" data={MOCK_SCATTER_DATA} fill="#8b5cf6"
                                             shape="circle"/>
                                </ScatterChart>
                            </ResponsiveContainer>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-2">Évolution des volumes (Empilé)</h2>
                            <p className="text-xs text-gray-500 mb-4">Cliquez sur la légende pour filtrer une
                                typologie.</p>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={MOCK_AREA_DATA} margin={{top: 10, right: 10, left: 0, bottom: 0}}>
                                    <XAxis dataKey="month"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                    <Tooltip contentStyle={{borderRadius: '8px'}}/>
                                    <Legend onClick={(e) => toggleSeries(e.dataKey.trim())}
                                            wrapperStyle={{cursor: 'pointer'}}/>
                                    {!hiddenSeries['appartement'] &&
                                        <Area type="monotone" dataKey="appartement" stackId="1" stroke="#3b82f6"
                                              fill="#3b82f6" fillOpacity={0.6}/>}
                                    {!hiddenSeries['maison'] &&
                                        <Area type="monotone" dataKey="maison" stackId="1" stroke="#10b981"
                                              fill="#10b981" fillOpacity={0.6}/>}
                                    {!hiddenSeries['terrain'] &&
                                        <Area type="monotone" dataKey="terrain" stackId="1" stroke="#f59e0b"
                                              fill="#f59e0b" fillOpacity={0.6}/>}
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    </div>

                    {/* ROW 3: Interactive BarChart Drill-Down */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Volume par Département</h2>
                                <p className="text-xs text-gray-500">Cliquez sur une barre pour isoler un
                                    département.</p>
                            </div>
                            {activeDeptChart && (
                                <button
                                    onClick={() => setActiveDeptChart(null)}
                                    className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
                                >
                                    Annuler le filtre ({activeDeptChart})
                                </button>
                            )}
                        </div>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={MOCK_DEPT_INTERACTIVE}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                <XAxis dataKey="nom"/>
                                <YAxis/>
                                <Tooltip cursor={{fill: 'transparent'}}/>
                                <Bar dataKey="volume" onClick={(data) => setActiveDeptChart(data.nom)}>
                                    {MOCK_DEPT_INTERACTIVE.map((entry, index) => (
                                        <Cell
                                            cursor="pointer"
                                            key={`cell-${index}`}
                                            fill={activeDeptChart === entry.nom || !activeDeptChart ? '#3b82f6' : '#e5e7eb'}
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* ROW 4: Data Table */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Palmarès des départements</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b text-sm">
                                    <th className="text-left py-3 px-4 font-semibold">Département</th>
                                    <th className="text-right py-3 px-4 font-semibold">Prix moyen/m²</th>
                                    <th className="text-right py-3 px-4 font-semibold">Prix moyen</th>
                                    <th className="text-right py-3 px-4 font-semibold">Nb ventes</th>
                                    <th className="text-right py-3 px-4 font-semibold">Évolution</th>
                                </tr>
                                </thead>
                                <tbody>
                                {MOCK_DEPT_TABLE.map((dept) => (
                                    <tr key={dept.departmentCode} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="py-3 px-4 font-medium text-gray-800">Dép. {dept.departmentCode}</td>
                                        <td className="text-right py-3 px-4">{dept.avgPricePerSqm.toLocaleString('fr-FR')} €</td>
                                        <td className="text-right py-3 px-4">{(dept.avgPrice / 1000).toFixed(0)}K €</td>
                                        <td className="text-right py-3 px-4">{dept.totalSales.toLocaleString('fr-FR')}</td>
                                        <td className="text-right py-3 px-4">
                        <span
                            className={`inline-flex items-center gap-1 ${dept.priceEvolution > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {dept.priceEvolution > 0 ? <TrendingUp className="size-3"/> :
                              <TrendingDown className="size-3"/>}
                            {dept.priceEvolution > 0 ? '+' : ''}{dept.priceEvolution}%
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                </>
            )}

            {/* FOOTER: Info */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-2">Source des données</h3>
                <p className="text-sm text-blue-800">
                    Demandes de valeurs foncières (DVF) - Données publiques officielles. Tableau de bord simulé avec des
                    données analytiques interactives.
                </p>
            </div>
        </div>
    );
}
