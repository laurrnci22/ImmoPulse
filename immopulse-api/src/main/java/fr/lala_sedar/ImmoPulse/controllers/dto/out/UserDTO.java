package fr.lala_sedar.ImmoPulse.controllers.dto.out;

public record UserDTO (
        String username,
        String password,
        String role
) {}