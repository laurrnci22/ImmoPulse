package fr.lala_sedar.ImmoPulse.controllers.dto.out;

import fr.lala_sedar.ImmoPulse.infra.entity.LandTransactionEntity;
import fr.lala_sedar.ImmoPulse.infra.entity.enums.Role;

import java.util.ArrayList;
import java.util.List;

public record UserDTO (
        String username,
        Role role,
        String ImageUrl,
        List<LandTransactionDTO> wishlist
) {}
