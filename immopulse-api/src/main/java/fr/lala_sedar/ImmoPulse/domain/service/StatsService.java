package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.mapper.LandTransactionMapper;
import fr.lala_sedar.ImmoPulse.infra.repository.clickhouse.LandTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final LandTransactionRepository repository;

    public MarketSummaryDTO getGlobalStats(String departement, String propertyType) {
        return repository.getGlobalStats(departement, propertyType);
    }

    public List<PropertyDistributionDTO> getPropertyDistribution(String departement, String propertyType) {
        return repository.getPropertyDistribution(departement, propertyType);
    }
}
