package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record DeptTableDTO(
        String departmentCode,
        Double avgPricePerSqm,
        Double avgPrice,
        Long totalSales,
       Double priceEvolution
) {}
