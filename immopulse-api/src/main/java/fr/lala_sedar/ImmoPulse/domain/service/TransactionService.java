package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.TransactionDTO;
import fr.lala_sedar.ImmoPulse.domain.mapper.TransactionMapper;
import fr.lala_sedar.ImmoPulse.infra.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repository;

    public Collection<TransactionDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(TransactionMapper::toDTO)
                .toList();
    }
}
