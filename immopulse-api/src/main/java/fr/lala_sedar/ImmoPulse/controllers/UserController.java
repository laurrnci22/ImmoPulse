package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.UserDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * REST Controller for managing user-related operations.
 * Exposes endpoints to register and retrieve users.
 */
@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /**
     * Registers a new user.
     *
     * @param user the DTO containing the user's information.
     * @return 201 Created if successful,
     * 400 Bad Request if the data is invalid or user exists,
     * 500 Internal Server Error if an unexpected error occurs.
     */
    @PostMapping("")
    public ResponseEntity<String> register(@RequestBody UserDto user) {
        try {
            userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("User created successfully!");
        }
        catch (IllegalArgumentException e) {
            log.warn("Invalid registration attempt: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(e.getMessage());
        }
        catch (Exception e) {
            log.error("Technical error during user registration", e);
            return ResponseEntity.internalServerError()
                    .body("An internal error occurred during registration.");
        }
    }

    /**
     * Retrieves the list of all registered users.
     *
     * @return 200 OK with the list of users,
     * or 204 No Content if the list is empty.
     */
    @GetMapping("")
    public ResponseEntity<Collection<UserDTO>> getUsers() {
        log.info("Fetching users list");
        Collection<UserDTO> users = userService.findUsers();

        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(users);
    }
}
