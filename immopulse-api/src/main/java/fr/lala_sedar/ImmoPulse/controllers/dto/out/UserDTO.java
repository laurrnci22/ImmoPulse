package fr.lala_sedar.ImmoPulse.controllers.dto.out;

import fr.lala_sedar.ImmoPulse.infra.entity.enums.Role;

public record UserDTO (
        String username,
        Role role
) {}
