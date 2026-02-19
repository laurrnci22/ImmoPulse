package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.mapper.LandTransactionMapper;
import fr.lala_sedar.ImmoPulse.infra.repository.clickhouse.LandTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LandTransactionService {

    private final LandTransactionRepository repository;

    public List<Map<String, Object>> getCityStatistics() {
        return repository.getAveragePriceByCity();
    }

    public Collection<LandTransactionDTO> findByCriteria(String dept, String type) {
        return repository.findByCriteria(dept, type)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();
    }

    public Page<LandTransactionDTO> getAll(Pageable pageable) {
        List<LandTransactionDTO> content = repository.getAll(pageable)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();

        long total = repository.count();

        return new PageImpl<>(content, pageable, total);
    }

    public MarketSummaryDTO getGlobalStats() {
        return repository.getGlobalStats();
    }

    public List<MarketMonthlyStatDTO> getMonthlyStats() {
        return repository.getMonthlyStats();
    }

    public List<MarketPriceMonthlyStatDTO> getPriceMonthlyStats() {
        return repository.getMonthlyStatsWithAvgPricePerSqm();
    }

    public List<DepartmentStatDTO> getDepartmentStats() {
        return repository.getDepartmentStats();
    }
}