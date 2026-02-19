package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record MarketSummaryDTO (
    Long totalTransactions,
    Double avgPricePerSqm,
    Double avgPrice,
    Double totalVolume,
    Double yearOverYearChange
){}