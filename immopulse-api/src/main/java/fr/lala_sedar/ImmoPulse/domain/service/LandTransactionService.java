package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.LandTransactionFilterDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.mapper.LandTransactionMapper;
import fr.lala_sedar.ImmoPulse.infra.repository.clickhouse.LandTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LandTransactionService {

    private final LandTransactionRepository repository;

    @Cacheable("cityStatistics")
    public List<Map<String, Object>> getCityStatistics() {
        return repository.getAveragePriceByCity();
    }

    @Cacheable(value = "searchTransactions", key = "#term + '-' + #pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<LandTransactionDTO> search(String term, Pageable pageable) {
        List<LandTransactionDTO> content = repository.search(term, pageable)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();

        long total = repository.count(term);

        return new PageImpl<>(content, pageable, total);
    }

    @Cacheable(value = "allTransactions", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<LandTransactionDTO> getAll(Pageable pageable) {
        List<LandTransactionDTO> content = repository.getAll(pageable)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();

        long total = repository.count("");

        return new PageImpl<>(content, pageable, total);
    }

    @Cacheable("monthlyStats")
    public List<MarketMonthlyStatDTO> getMonthlyStats() {
        return repository.getMonthlyStats();
    }

    @Cacheable("priceMonthlyStats")
    public List<MarketPriceMonthlyStatDTO> getPriceMonthlyStats() {
        return repository.getMonthlyStatsWithAvgPricePerSqm();
    }

    @Cacheable("departmentStats")
    public List<DepartmentStatDTO> getDepartmentStats() {
        return repository.getDepartmentStats();
    }

    @Cacheable("allDepartments")
    public List<String> getAllDepartments() {
        List<String> departments = repository.getAllDepartments();
        departments.sort(String::compareTo);
        return departments;
    }

    @Cacheable("allPropertyTypes")
    public List<String> getAllPropertyTypes() {
        List<String> propertyTypes = repository.getAllPropertyTypes();
        propertyTypes.sort(String::compareTo);
        return propertyTypes;
    }

    @Cacheable(value = "searchWithFilters", key = "#filters.hashCode()")
    public Page<LandTransactionDTO> searchWithFilters(LandTransactionFilterDto filters) {
        PageRequest pageable = PageRequest.of(filters.getPage(), filters.getSize());

        List<LandTransactionDTO> content = repository.searchWithFilters(filters, pageable)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();

        long total = repository.countWithFilters(filters);

        return new PageImpl<>(content, pageable, total);
    }
}
