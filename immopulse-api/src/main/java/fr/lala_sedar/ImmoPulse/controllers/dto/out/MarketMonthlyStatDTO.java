package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record MarketMonthlyStatDTO(
    String month,
    Long sales
) {}