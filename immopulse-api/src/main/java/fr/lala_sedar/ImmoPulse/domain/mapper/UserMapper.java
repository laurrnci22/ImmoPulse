package fr.lala_sedar.ImmoPulse.domain.mapper;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserResponseDTO;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@UtilityClass
public class UserMapper {
    private static String DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

    public static UserDTO toDTO(final UserEntity entity) {
        return new UserDTO(entity.getUsername(), entity.getRole(), DEFAULT_IMAGE_URL );
    }

    public static UserResponseDTO toUserResponseDTO(final UserEntity entity) {
        return new UserResponseDTO(entity.getId(), entity.getUsername(), entity.getRole().name());
    }

}

