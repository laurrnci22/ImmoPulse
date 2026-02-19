package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record MarketPriceMonthlyStatDTO (
    String month,
    long sales,
    double avgPricePerSqm
) {}