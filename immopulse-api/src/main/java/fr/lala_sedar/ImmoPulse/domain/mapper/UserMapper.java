package fr.lala_sedar.ImmoPulse.domain.mapper;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public static UserDTO toDTO(final UserEntity entity) {
        return new UserDTO(entity.getUsername(), entity.getRole());
    }


}

