import { Card } from '../../components/ui/card.tsx';
import { TrendingUp, TrendingDown, Home, EuroIcon, BarChart3, Activity } from 'lucide-react';
import { mockMarketStats, mockMonthlyStats, mockDepartmentStats } from '../../data/mockData.ts';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function Dashboard() {
  const stats = mockMarketStats;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord analytique</h1>
        <p className="text-gray-600">
          Données DVF - Analyse du marché immobilier français (2020-2025)
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="size-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">+{stats.yearOverYearChange}%</span>
            </div>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Transactions totales</h3>
          <p className="text-2xl font-bold">
            {(stats.totalTransactions / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-gray-500 mt-1">Sur 12 mois glissants</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Home className="size-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">+4.2%</span>
            </div>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Prix moyen au m²</h3>
          <p className="text-2xl font-bold">
            {stats.avgPricePerSqm.toLocaleString('fr-FR')} €
          </p>
          <p className="text-xs text-gray-500 mt-1">Moyenne nationale</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <EuroIcon className="size-6 text-indigo-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">+3.5%</span>
            </div>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Prix moyen</h3>
          <p className="text-2xl font-bold">
            {(stats.avgPrice / 1000).toFixed(0)}K €
          </p>
          <p className="text-xs text-gray-500 mt-1">Toutes typologies</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Activity className="size-6 text-emerald-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">+{stats.yearOverYearChange}%</span>
            </div>
          </div>
          <h3 className="text-sm text-gray-600 mb-1">Volume total</h3>
          <p className="text-2xl font-bold">
            {(stats.totalVolume / 1000000000).toFixed(0)}Md €
          </p>
          <p className="text-xs text-gray-500 mt-1">Sur 12 mois</p>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Trend */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Évolution des ventes mensuelles</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockMonthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => value.toLocaleString('fr-FR')}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Nombre de ventes" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Price Evolution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Évolution du prix moyen au m²</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMonthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => `${value.toLocaleString('fr-FR')} €`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgPricePerSqm"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
                name="Prix moyen/m²"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Department Stats Table */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Statistiques par département</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-sm">Département</th>
                <th className="text-right py-3 px-4 font-semibold text-sm">Prix moyen/m²</th>
                <th className="text-right py-3 px-4 font-semibold text-sm">Prix moyen</th>
                <th className="text-right py-3 px-4 font-semibold text-sm">Nb ventes</th>
                <th className="text-right py-3 px-4 font-semibold text-sm">Évolution</th>
              </tr>
            </thead>
            <tbody>
              {mockDepartmentStats.map((dept) => (
                <tr key={dept.departmentCode} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium">{dept.departmentName}</span>
                      <span className="text-gray-500 ml-2">({dept.departmentCode})</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-medium">
                    {dept.avgPricePerSqm.toLocaleString('fr-FR')} €
                  </td>
                  <td className="text-right py-3 px-4">
                    {(dept.avgPrice / 1000).toFixed(0)}K €
                  </td>
                  <td className="text-right py-3 px-4">
                    {dept.totalSales.toLocaleString('fr-FR')}
                  </td>
                  <td className="text-right py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        dept.priceEvolution > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {dept.priceEvolution > 0 ? (
                        <TrendingUp className="size-4" />
                      ) : (
                        <TrendingDown className="size-4" />
                      )}
                      {dept.priceEvolution > 0 ? '+' : ''}
                      {dept.priceEvolution}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Data Source Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-2">Source des données</h3>
        <p className="text-sm text-blue-800">
          Demandes de valeurs foncières (DVF) - Données publiques officielles. Les données
          présentées sont basées sur environ 30 millions de transactions immobilières réalisées
          sur les 5 dernières années en France. Les statistiques sont mises à jour mensuellement.
        </p>
      </div>
    </div>
  );
}
