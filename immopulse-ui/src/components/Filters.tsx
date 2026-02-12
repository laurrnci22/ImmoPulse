import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
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
          <Button variant="ghost" onClick={resetFilters} className="gap-2">
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
                onValueChange={(value: any) => onFiltersChange({ ...filters, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Appartement">Appartement</SelectItem>
                  <SelectItem value="Maison">Maison</SelectItem>
                  <SelectItem value="Terrain">Terrain</SelectItem>
                  <SelectItem value="Local commercial">Local commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <Label>Département</Label>
              <Select
                value={filters.department}
                onValueChange={(value: any) => onFiltersChange({ ...filters, department: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="75">Paris (75)</SelectItem>
                  <SelectItem value="69">Rhône (69)</SelectItem>
                  <SelectItem value="13">Bouches-du-Rhône (13)</SelectItem>
                  <SelectItem value="31">Haute-Garonne (31)</SelectItem>
                  <SelectItem value="33">Gironde (33)</SelectItem>
                  <SelectItem value="44">Loire-Atlantique (44)</SelectItem>
                </SelectContent>
              </Select>
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
                value={[filters.minSurface]}
                onValueChange={([value]) => onFiltersChange({ ...filters, minSurface: value })}
                max={300}
                step={10}
                className="mt-2"
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
