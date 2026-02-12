import type {Property} from '../types/property';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, MapPin, Home } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onSelect(property)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={property.imageUrl}
          alt={`${property.type} à ${property.city}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={(e: { stopPropagation: () => void; }) => {
            e.stopPropagation();
          }}
        >
          <Heart className="size-5" />
        </Button>
        <Badge className="absolute top-2 left-2 bg-white text-gray-900">
          {property.type}
        </Badge>
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-2xl font-bold text-blue-600">
            {property.price.toLocaleString('fr-FR')} €
          </p>
          <p className="text-sm text-gray-600">
            {property.pricePerSqm.toLocaleString('fr-FR')} €/m²
          </p>
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-2">
          <MapPin className="size-4" />
          <p className="text-sm">
            {property.city} ({property.postalCode})
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
          <div className="flex items-center gap-1">
            <Home className="size-4" />
            <span>{property.surface} m²</span>
          </div>
          {property.rooms && (
            <div>
              <span>{property.rooms} pièces</span>
            </div>
          )}
        </div>

        {property.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
        )}

        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-500">
            Vendu le {new Date(property.saleDate).toLocaleDateString('fr-FR')}
          </p>
        </div>
      </div>
    </Card>
  );
}
