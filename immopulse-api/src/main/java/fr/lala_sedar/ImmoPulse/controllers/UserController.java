package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.UserDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public String register(@RequestBody UserDto user) {
        userService.register(user);
        return "Utilisateur créé avec succès !";
    }

    @GetMapping("")
    public ResponseEntity<Collection<UserDTO>> getAuthors() {
        log.info("Fetching authors");
        return ResponseEntity.ok(userService.findUsers());
    }
}

