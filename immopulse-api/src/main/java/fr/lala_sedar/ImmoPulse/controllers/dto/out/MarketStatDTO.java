package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record MarketStatDTO(
    String month,
    Long volumeVentes,
    Double prixMoyen
) {}
