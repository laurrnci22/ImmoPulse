package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.infra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
}
