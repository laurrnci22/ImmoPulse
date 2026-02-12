import type {Property} from '../types/property';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, MapPin, Home, Calendar, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

export function PropertyDetails({ property, onClose }: PropertyDetailsProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{property.type} à {property.city}</span>
            <Button variant="ghost" size="icon">
              <Heart className="size-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={property.imageUrl}
              alt={`${property.type} à ${property.city}`}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-white text-gray-900">
              {property.type}
            </Badge>
          </div>

          {/* Prix et infos principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-600 mb-1">Prix de vente</p>
              <p className="text-3xl font-bold text-blue-900">
                {property.price.toLocaleString('fr-FR')} €
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-sm text-purple-600 mb-1">Prix au m²</p>
              <p className="text-3xl font-bold text-purple-900">
                {property.pricePerSqm.toLocaleString('fr-FR')} €
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-indigo-600 mb-1">Surface</p>
              <p className="text-3xl font-bold text-indigo-900">
                {property.surface} m²
              </p>
            </div>
          </div>

          {/* Détails */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Détails du bien</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="font-medium">{property.address}</p>
                  <p className="text-sm text-gray-600">
                    {property.postalCode} {property.city}
                  </p>
                </div>
              </div>

              {property.rooms && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Home className="size-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Nombre de pièces</p>
                    <p className="font-medium">{property.rooms} pièces</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Date de vente</p>
                  <p className="font-medium">
                    {new Date(property.saleDate).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="size-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Département</p>
                  <p className="font-medium">
                    {property.department} ({property.departmentCode})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-700">{property.description}</p>
            </div>
          )}

          {/* DVF Info */}
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h3 className="font-semibold text-amber-900 mb-2">
              Information sur les données
            </h3>
            <p className="text-sm text-amber-800">
              Cette transaction est issue de la base de données DVF (Demandes de valeurs foncières),
              qui recense l'ensemble des ventes immobilières réalisées en France. Les données sont
              publiques et mises à disposition par la Direction Générale des Finances Publiques.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
