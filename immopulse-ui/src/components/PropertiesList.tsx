import { useState } from 'react';
import type {Property} from '../types/property';
import { PropertyCard } from './PropertyCard';
import { PropertyDetails } from './PropertyDetails';
import { Filters } from './Filters';
import { mockProperties } from '../data/mockData';

export function PropertiesList() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    minPrice: 0,
    maxPrice: 1000000,
    minSurface: 0,
    department: 'all'
  });

  const filteredProperties = mockProperties.filter((property) => {
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;
    if (property.surface < filters.minSurface) return false;
    if (filters.department !== 'all' && property.departmentCode !== filters.department) return false;
    return true;
  });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Transactions immobilières récentes</h1>
          <p className="text-gray-600">
            {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} vendu
            {filteredProperties.length > 1 ? 's' : ''} • Données DVF
          </p>
        </div>

        {/* Filters */}
        <Filters filters={filters} onFiltersChange={setFilters} />

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={setSelectedProperty}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun bien ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
}
