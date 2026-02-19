package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.service.LandTransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/land-transaction")
@RequiredArgsConstructor
public class LandTransactionController {

    private final LandTransactionService landTransactionService;

    @GetMapping
    public Page<LandTransactionDTO> getAll(
            @PageableDefault(size = 20, sort = "mutationDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        log.info("Fetching transactions - Page: {}, Size: {}", pageable.getPageNumber(), pageable.getPageSize());
        return landTransactionService.getAll(pageable);
    }

    @GetMapping("/stats/global")
    public MarketSummaryDTO getGlobalStats() {
        return landTransactionService.getGlobalStats();
    }

    @GetMapping("/stats/monthly")
    public List<MarketMonthlyStatDTO> getMonthlyStats() {return landTransactionService.getMonthlyStats();}

    @GetMapping("/stats/price-monthly")
    public List<MarketPriceMonthlyStatDTO> getPriceMonthlyStats() {return landTransactionService.getPriceMonthlyStats();}

    @GetMapping("/stats/department")
    public List<DepartmentStatDTO> getDepartmentStats() {return landTransactionService.getDepartmentStats();}

    // TODO route non utilisée pour le moment
    @GetMapping("/stats/avg-price-city")
    public List<Map<String, Object>> getCityStats() {
        return landTransactionService.getCityStatistics();
    }

    // TODO route non utilisée pour le moment
    @GetMapping("/search")
    public Collection<LandTransactionDTO> search(
            @RequestParam String dept,
            @RequestParam String type) {
        return landTransactionService.findByCriteria(dept, type);
    }
}