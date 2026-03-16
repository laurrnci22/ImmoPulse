package fr.lala_sedar.ImmoPulse.domain.service;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.LandTransactionFilterDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.mapper.LandTransactionMapper;
import fr.lala_sedar.ImmoPulse.infra.repository.clickhouse.LandTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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

    public Page<LandTransactionDTO> search(String term, Pageable pageable) {
        List<LandTransactionDTO> content = repository.search(term, pageable)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();

        long total = repository.count(term);

        return new PageImpl<>(content, pageable, total);
    }

    public Page<LandTransactionDTO> getAll(Pageable pageable) {
        List<LandTransactionDTO> content = repository.getAll(pageable)
                .stream()
                .map(LandTransactionMapper::toDTO)
                .toList();

        long total = repository.count("");

        return new PageImpl<>(content, pageable, total);
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


    public List<String> getAllDepartments() {
        List<String> departments = repository.getAllDepartments();
        departments.sort(String::compareTo);
        return departments;
    }

    public List<String> getAllPropertyTypes() {
        List<String> propertyTypes = repository.getAllPropertyTypes();
        propertyTypes.sort(String::compareTo);
        return propertyTypes;
    }

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
