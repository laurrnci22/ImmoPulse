package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.UserDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.UserResponseDTO;
import fr.lala_sedar.ImmoPulse.domain.mapper.UserMapper;
import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import fr.lala_sedar.ImmoPulse.infra.entity.enums.Role;
import fr.lala_sedar.ImmoPulse.infra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;


    public Collection<UserDTO> findUsers() {
        return repository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    public void saveUser(UserEntity user) {
        repository.save(user);
    }


    public boolean register(UserDto user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.ADMIN);

        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(user.getUsername());
        userEntity.setPassword(user.getPassword());
        userEntity.setRole(user.getRole());
        saveUser(userEntity);
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userFromDb = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + username));

        return org.springframework.security.core.userdetails.User
                .builder()
                .username(userFromDb.getUsername())
                .password(userFromDb.getPassword())
                .roles(userFromDb.getRole().name())
                .build();
    }

    public UserResponseDTO getUserInfo(String username) {
        UserEntity user = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );
    }




}
