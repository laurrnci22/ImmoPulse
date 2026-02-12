package fr.lala_sedar.ImmoPulse.domain.model.bo.out;

import fr.lala_sedar.ImmoPulse.infra.entity.TransactionEntity;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;

public record TransactionBO(TransactionEntity transaction) {

  /*  public TransactionBO(
            Long userId,
            String username,
            String password,
            String role
    ) {
        final UserEntity userEntity = new UserEntity() {{
            setId(userId);
            setUsername(username);
            setPassword(password);
            setRole(role);
        }};
        this(userEntity);
    }*/
}

