package fr.lala_sedar.ImmoPulse.domain.mapper;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.TransactionDTO;
import fr.lala_sedar.ImmoPulse.domain.model.bo.out.TransactionBO;
import fr.lala_sedar.ImmoPulse.infra.entity.TransactionEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class TransactionMapper {

    public static TransactionBO toBO(TransactionEntity transaction) {
        return new TransactionBO(transaction);
    }

    public static TransactionDTO toDTO(TransactionEntity entity) {
        return new TransactionDTO(
                entity.getMutationDate(),
                entity.getMutationType(),
                entity.getPropertyValue(),
                entity.getStreetNumber(),
                entity.getStreetName(),
                entity.getPostalCode(),
                entity.getCity(),
                entity.getDepartmentCode(),
                entity.getPropertyType(),
                entity.getLivingArea(),
                entity.getRoomsCount(),
                entity.getLandArea()
        );
    }
}
