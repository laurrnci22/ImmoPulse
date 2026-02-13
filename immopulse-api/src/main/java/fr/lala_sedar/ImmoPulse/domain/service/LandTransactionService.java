package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.LandTransactionDTO;
import fr.lala_sedar.ImmoPulse.domain.mapper.LandTransactionMapper;
import fr.lala_sedar.ImmoPulse.infra.repository.clickhouse.LandTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LandTransactionService {

    private final LandTransactionRepository repository;

    public Collection<LandTransactionDTO> findAll() {
        return repository.findAll(100, 0)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();
    }

    public List<Map<String, Object>> getCityStatistics() {
        return repository.getAveragePriceByCity();
    }

    public Collection<LandTransactionDTO> findByCriteria(String dept, String type) {
        return repository.findByCriteria(dept, type)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();
    }
}