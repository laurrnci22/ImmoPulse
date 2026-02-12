package fr.lala_sedar.ImmoPulse.domain.mapper;

import fr.lala_sedar.ImmoPulse.domain.model.bo.out.UserBO;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public static UserBO toBO(UserEntity user) {
        return new UserBO(user);
    }
}

