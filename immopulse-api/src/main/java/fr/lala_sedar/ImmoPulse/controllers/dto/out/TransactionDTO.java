package fr.lala_sedar.ImmoPulse.controllers.dto.out;

import java.time.LocalDate;

public record TransactionDTO (
        LocalDate mutationDate,
        String mutationType,
        Double propertyValue,
        String streetNumber,
        String streetName,
        String postalCode,
        String city,
        String departmentCode,
        String propertyType,
        Integer livingArea,
        Integer roomsCount,
        Integer landArea
) {}