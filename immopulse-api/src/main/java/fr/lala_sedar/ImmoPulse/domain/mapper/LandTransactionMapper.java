package fr.lala_sedar.ImmoPulse.domain.mapper;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.LandTransactionDTO;
import fr.lala_sedar.ImmoPulse.infra.entity.LandTransactionEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class LandTransactionMapper {

    public static LandTransactionDTO toDTO(LandTransactionEntity entity) {
        return new LandTransactionDTO(
                entity.getMutationDate(),
                entity.getMutationType(),
                entity.getPropertyValue(),
                entity.getStreetNumber(),
                entity.getStreetName(),
                entity.getPostalCode(),
                entity.getCity(),
                entity.getDepartmentCode(),
                entity.getSection(),
                entity.getPlotNumber(),
                entity.getBuiltArea(),
                entity.getPropertyType(),
                entity.getLandArea()
        );
    }
}
