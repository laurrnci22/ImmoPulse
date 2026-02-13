package fr.lala_sedar.ImmoPulse.domain.model.bo.out;

import fr.lala_sedar.ImmoPulse.infra.entity.LandTransactionEntity;

import java.util.UUID;

public record LandTransactionBO(LandTransactionEntity transaction) {

    public LandTransactionBO(
            UUID userId,
            String username,
            String password,
            String role
    ) {
        final LandTransactionEntity userEntity = new LandTransactionEntity() {{
            setId(userId);
        }};
        this(userEntity);
    }
}

