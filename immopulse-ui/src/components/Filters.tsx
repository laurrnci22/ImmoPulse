'use client'

import { Card } from './ui/card.tsx';
import { Label } from './ui/label.tsx';
import { Input } from './ui/input.tsx';
import { Slider } from './ui/slider.tsx';
import { Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDepartements, getPropertyTypes } from '../services/LandTransactionService.ts';
import type { Departement } from '../types/property.ts';

interface FiltersProps {
  filters: {
    type: string;
    minPrice: number;
    maxPrice: number;
    minSurface: number;
    department: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchDepart = async () => {
      try {
        const data = await getDepartements();
        setDepartements(data);
      } catch (error) {
        console.error("Erreur lors du chargement des départements", error);
      }
    };

    const fetchPropertyTypes = async () => {
      try {
        const data = await getPropertyTypes();
        setPropertyTypes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des types de propriétés", error);
      }
    };

    fetchDepart();
    fetchPropertyTypes();
  }, []);

  const hasActiveFilters =
      filters.type !== 'all' ||
      filters.minPrice > 0 ||
      filters.maxPrice < 1000000 ||
      filters.minSurface > 0 ||
      filters.department !== 'all';

  const resetFilters = () => {
    onFiltersChange({
      type: 'all',
      minPrice: 0,
      maxPrice: 1000000,
      minSurface: 0,
      department: 'all',
    });
  };

  return (
      <div className="mb-6">
        <Card className="p-4 bg-gray-50 border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">

            {/* Label */}
            <div className="flex items-center gap-2 text-gray-700 font-medium min-w-max">
              <Filter className="size-5" />
              <span>Filtres :</span>
            </div>

            {/* Type de bien */}
            <select
                className="p-2 border rounded-md bg-white flex-1 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                value={filters.type}
                onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            >
              <option value="all">Toutes typologies</option>
              {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
              ))}
            </select>

            {/* Département */}
            <select
                className="p-2 border rounded-md bg-white flex-1 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                value={filters.department}
                onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
            >
              <option value="all">Tous les départements</option>
              {departements.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.name}
                  </option>
              ))}
            </select>

            {/* Bouton filtres avancés */}
            <button
                className="p-2 border rounded-md bg-white flex-1 w-full focus:ring-2 focus:ring-blue-500 outline-none text-left text-gray-500"
                onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? '▲ Moins de filtres' : '▼ Plus de filtres'}
            </button>

            {/* Reset */}
            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm min-w-max"
                >
                  <X className="size-4" />
                  Réinitialiser
                </button>
            )}
          </div>

          {/* Filtres avancés */}
          {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">

                <div className="space-y-1">
                  <Label className="text-gray-700 text-sm font-medium">Prix minimum</Label>
                  <Input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => onFiltersChange({ ...filters, minPrice: Number(e.target.value) })}
                      placeholder="0 €"
                      className="bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-700 text-sm font-medium">Prix maximum</Label>
                  <Input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) })}
                      placeholder="1 000 000 €"
                      className="bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-700 text-sm font-medium">
                    Surface minimum : {filters.minSurface} m²
                  </Label>
                  <Slider
                      min={0}
                      max={300}
                      step={10}
                      value={filters.minSurface}
                      onChange={(e) => onFiltersChange({ ...filters, minSurface: Number(e.target.value) })}
                      className="mt-2"
                  />
                </div>
              </div>
          )}
        </Card>
      </div>
  );
}