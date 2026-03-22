package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserResponseDTO;
import fr.lala_sedar.ImmoPulse.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;


    @GetMapping("/login")
    public String login(Authentication authentication) {
        return "Connecté en tant que : " + authentication.getName();
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me(Authentication authentication) {
        UserResponseDTO user = userService.getUserInfo(authentication.getName());
        UserDTO userDTO = userService.findById(user.id());
        return ResponseEntity.ok(userDTO);
    }
}
