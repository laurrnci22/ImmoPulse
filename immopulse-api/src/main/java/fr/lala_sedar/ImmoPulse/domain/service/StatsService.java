package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.infra.repository.clickhouse.LandTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final LandTransactionRepository repository;

    @Cacheable("globalStats")
    public MarketSummaryDTO getGlobalStats(String departement, String propertyType) {
        return repository.getGlobalStats(departement, propertyType);
    }

    @Cacheable("propertyDistribution")
    public List<PropertyDistributionDTO> getPropertyDistribution(String departement, String propertyType) {
        return repository.getPropertyDistribution(departement, propertyType);
    }

    @Cacheable("marketStats")
    public List<MarketStatDTO> getMarketStats(String departement, String propertyType) {
        return repository.getMarketStats(departement, propertyType);
    }

    @Cacheable("priceSurface")
    public List<PriceSurfaceDTO> getPriceSurface(String departement, String propertyType, Integer limit) {
        return repository.getPriceSurface(departement, propertyType, limit);
    }

    @Cacheable("depVolume")
    public List<DeptVolumeDTO> getDeptVolume(String departement, String propertyType) {
        return repository.getDeptVolume(departement, propertyType);
    }

    @Cacheable("volumeEvolution")
    public List<VolumeEvolutionDTO> getVolumeEvolution(String departement, String propertyType) {
        return repository.getVolumeEvolution(departement, propertyType);
    }

    @Cacheable("departmentTable")
     public List<DeptTableDTO> getDepartmentTable() {
        return repository.getDepartmentTable();
    }

}
