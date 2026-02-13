import { useEffect, useState } from 'react';
import { Filters } from '../../components/Filters.tsx';
import type { LandTransaction } from "../../models/LandTransaction.ts";
import { LandTransactionService } from "../../services/LandTransactionService.ts";
import {LandTransactionGrid} from "../../components/LandTransactionGrid.tsx";
import {Pagination} from "../../components/Pagination.tsx";

export function PropertiesList() {
  const [landTransactions, setLandTransactions] = useState<LandTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const [filters, setFilters] = useState({
    type: 'all',
    minPrice: 0,
    maxPrice: 5000000,
    minSurface: 0,
    department: 'all'
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsFetching(true);

        const data = await LandTransactionService.getLandTransactions(currentPage, 20);

        setLandTransactions(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);

      } catch (error) {
        console.error("Erreur de chargement", error);

      } finally {
        setIsFetching(false);
      }
    };

    fetchTransactions();
  }, [currentPage]);

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Transactions immobilières</h1>
          <p className="text-sm text-slate-500 font-medium">
            {totalElements.toLocaleString('fr-FR')} résultats trouvés au total
          </p>
        </div>

        <Filters filters={filters} onFiltersChange={setFilters} /> {/* TODO */}

        {totalPages > 1 && (
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalElements={totalElements}
                pageSize={20}
                onPageChange={setCurrentPage}
                isFetching={isFetching}
            />
        )}

        <LandTransactionGrid
            transactions={landTransactions}
            isFetching={isFetching}
            onSelect={(t) => console.log("Selected:", t)}
        /> {/* TODO faire la selection */}
      </div>
  );
}