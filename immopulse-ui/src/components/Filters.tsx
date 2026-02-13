'use client'

import { Card } from './ui/card.tsx';
import { Label } from './ui/label.tsx';
import { Select } from './ui/select.tsx'; // Import simplifié
import { Input } from './ui/input.tsx';
import { Slider } from './ui/slider.tsx';
import { Button } from './ui/button.tsx';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

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

  const resetFilters = () => {
    onFiltersChange({
      type: 'all',
      minPrice: 0,
      maxPrice: 1000000,
      minSurface: 0,
      department: 'all'
    });
  };

  return (
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
          >
            <SlidersHorizontal className="size-4" />
            Filtres
          </Button>
          {(filters.type !== 'all' || filters.minPrice > 0 || filters.maxPrice < 1000000 || filters.minSurface > 0 || filters.department !== 'all') && (
              <Button variant="ghost" onClick={resetFilters} className="gap-2 text-red-500 hover:text-red-600">
                <X className="size-4" />
                Réinitialiser
              </Button>
          )}
        </div>

        {showFilters && (
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Type de bien */}
                <div className="space-y-2">
                  <Label>Type de bien</Label>
                  <Select
                      value={filters.type}
                      onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
                      options={[
                        { value: "all", label: "Tous" },
                        { value: "Appartement", label: "Appartement" },
                        { value: "Maison", label: "Maison" },
                        { value: "Terrain", label: "Terrain" },
                        { value: "Local commercial", label: "Local commercial" }
                      ]}
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label>Département</Label>
                  <Select
                      value={filters.department}
                      onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
                      options={[
                        { value: "all", label: "Tous" },
                        { value: "75", label: "Paris (75)" },
                        { value: "69", label: "Rhône (69)" },
                        { value: "13", label: "Bouches-du-Rhône (13)" },
                        { value: "31", label: "Haute-Garonne (31)" },
                        { value: "33", label: "Gironde (33)" },
                        { value: "44", label: "Loire-Atlantique (44)" }
                      ]}
                  />
                </div>

                {/* Prix minimum */}
                <div className="space-y-2">
                  <Label>Prix minimum</Label>
                  <Input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => onFiltersChange({ ...filters, minPrice: Number(e.target.value) })}
                      placeholder="0 €"
                  />
                </div>

                {/* Prix maximum */}
                <div className="space-y-2">
                  <Label>Prix maximum</Label>
                  <Input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) })}
                      placeholder="1 000 000 €"
                  />
                </div>

                {/* Surface minimum */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Surface minimum: {filters.minSurface} m²</Label>
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
            </Card>
        )}
      </div>
  );
}