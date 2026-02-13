"use client";

import { Card } from './ui/card.tsx';
import { Badge } from './ui/badge.tsx';
import { Heart, MapPin, Home, Maximize, Calendar } from 'lucide-react';
import { Button } from './ui/button.tsx';
import type { LandTransaction } from "../models/LandTransaction.ts";

interface LandTransactionCardProps {
  landTransaction: LandTransaction;
  onSelect: (landTransaction: LandTransaction) => void;
}

export function LandTransactionCard({ landTransaction, onSelect }: LandTransactionCardProps) {
  const surfaceForPrice = landTransaction.builtArea || landTransaction.landArea;
  const pricePerSquareMeter = surfaceForPrice > 0
      ? Math.round(landTransaction.propertyValue / surfaceForPrice)
      : null;

  const fullAddress = `${landTransaction.streetNumber || ''} ${landTransaction.streetName}`.trim();

  const displayType = landTransaction.propertyType || "Bien immobilier";

  return (
      <Card
          className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-slate-200"
          onClick={() => onSelect(landTransaction)}
      >
        {/* Header de la carte avec Image de remplacement (puisque DVF n'a pas de photos) */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
              src={`https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600`}
              alt={displayType}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full shadow-sm"
              onClick={(e) => {
                e.stopPropagation();
                // Logique favoris ici
              }}
          >
            <Heart className="size-5 text-slate-600" />
          </Button>

          <Badge className="absolute top-2 left-2 bg-indigo-600 text-white border-none shadow-md">
            {displayType}
          </Badge>

          <div className="absolute bottom-2 left-2">
            <p className="text-white text-xs font-medium flex items-center gap-1">
              <Calendar className="size-3" />
              Vendu le {new Date(landTransaction.mutationDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-2xl font-extrabold text-slate-900">
              {landTransaction.propertyValue.toLocaleString('fr-FR')} €
            </p>
            {pricePerSquareMeter && (
                <Badge variant="outline" className="text-slate-500 font-normal border-slate-200">
                  {pricePerSquareMeter.toLocaleString('fr-FR')} €/m²
                </Badge>
            )}
          </div>

          <div className="space-y-1 mb-4">
            <div className="flex items-start gap-1 text-slate-900 font-semibold">
              <MapPin className="size-4 mt-1 shrink-0 text-indigo-500" />
              <p className="text-sm line-clamp-1">{landTransaction.city}</p>
            </div>
            <p className="text-xs text-slate-500 ml-5">
              {fullAddress || `Section ${landTransaction.section} - Parcelle ${landTransaction.plotNumber}`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Home className="size-4 text-slate-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Bâti</p>
                <p className="text-sm font-semibold">{landTransaction.builtArea || 0} m²</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Maximize className="size-4 text-slate-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Terrain</p>
                <p className="text-sm font-semibold">{landTransaction.landArea || 0} m²</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md">
                {landTransaction.mutationType}
            </span>
            <span className="text-[11px] text-slate-400">
                Dpt: {landTransaction.departmentCode}
            </span>
          </div>
        </div>
      </Card>
  );
}