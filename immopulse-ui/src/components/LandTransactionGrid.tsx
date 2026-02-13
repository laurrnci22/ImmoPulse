import { LandTransactionCard } from './LandTransactionCard.tsx';
import type { LandTransaction } from '../models/LandTransaction.ts';
import NoAvailableData from "./NoAvailableData.tsx";

interface LandTransactionGridProps {
    transactions: LandTransaction[];
    isFetching: boolean;
    onSelect: (transaction: LandTransaction) => void;
}

export function LandTransactionGrid({ transactions, isFetching, onSelect }: LandTransactionGridProps) {
    if (transactions.length === 0 && !isFetching) return <NoAvailableData />;

    return (
        <div className="relative">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 transition-opacity duration-300 opacity-100`}>
                {transactions.map((transaction, index) => (
                    <LandTransactionCard
                        key={transaction.id || index}
                        landTransaction={transaction}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    );
}