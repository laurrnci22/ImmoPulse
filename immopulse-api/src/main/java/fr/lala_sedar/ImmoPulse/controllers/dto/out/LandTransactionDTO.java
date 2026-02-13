package fr.lala_sedar.ImmoPulse.controllers.dto.out;

import java.time.LocalDate;

public record LandTransactionDTO(
        LocalDate mutationDate,
        String mutationType,
        Double propertyValue,
        String streetNumber,
        String streetName,
        String postalCode,
        String city,
        String departmentCode,
        String section,
        String plotNumber,
        Double builtArea,
        String propertyType,
        Double landArea
) {}