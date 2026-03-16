package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record PriceSurfaceDTO(
        String departmentCode,
    Long surface,
    String type,
    Double prix
) {}
