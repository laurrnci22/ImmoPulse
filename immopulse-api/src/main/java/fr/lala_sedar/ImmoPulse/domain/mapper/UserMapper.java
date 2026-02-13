package fr.lala_sedar.ImmoPulse.domain.mapper;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserResponseDTO;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@UtilityClass
public class UserMapper {

    public static UserDTO toDTO(final UserEntity entity) {
        return new UserDTO(entity.getUsername(), entity.getRole());
    }

    public static UserResponseDTO toUserResponseDTO(final UserEntity entity) {
        return new UserResponseDTO(entity.getId(), entity.getUsername(), entity.getRole().name());
    }

}

