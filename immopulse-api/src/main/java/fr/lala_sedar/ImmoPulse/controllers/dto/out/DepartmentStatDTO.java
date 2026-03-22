package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record DepartmentStatDTO (
    String departmentCode,
    double avgPricePerSqm,
    double avgPrice,
    long totalSales,
    double priceEvolution
) {}