package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.UserDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserResponseDTO;
import fr.lala_sedar.ImmoPulse.domain.mapper.UserMapper;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import fr.lala_sedar.ImmoPulse.infra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

/**
 * Service dedicated to managing user-related operations such as registration,
 * retrieval, and authentication.
 * Implements {@link UserDetailsService} for Spring Security integration.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Retrieves all users from the database.
     *
     * @return a collection of {@link UserDTO} representing all registered users.
     */
    @Transactional(readOnly = true)
    public Collection<UserDTO> findUsers() {
        return repository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    /**
     * Registers a new user in the system.
     * Encrypts the password before saving.
     *
     * @param userDto the data transfer object containing the new user's information.
     * @throws IllegalArgumentException if a user with the same username already exists.
     */
    @Transactional // Ensures database integrity during the write operation
    public void register(UserDto userDto) {
        if (repository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User already exists: " + userDto.getUsername());
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userDto.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userEntity.setRole(userDto.getRole());

        repository.save(userEntity);
        log.info("New user registered successfully: {}", userDto.getUsername());
    }

    /**
     * Loads a user by their username for Spring Security authentication.
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated {@link UserDetails} object (never null).
     * @throws UsernameNotFoundException if the user could not be found.
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userFromDb = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(userFromDb.getUsername())
                .password(userFromDb.getPassword())
                .roles(userFromDb.getRole().name())
                .build();
    }

    /**
     * Retrieves detailed information about a specific user.
     *
     * @param username the username of the user to retrieve.
     * @return a {@link UserResponseDTO} containing the user's details.
     * @throws UsernameNotFoundException if the user is not found in the database.
     */
    @Transactional(readOnly = true)
    public UserResponseDTO getUserInfo(String username) {
        UserEntity user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return UserMapper.toUserResponseDTO(user);
    }
}
