package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.LandTransactionFilterDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.service.LandTransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/land-transaction")
@RequiredArgsConstructor
public class LandTransactionController {

    private final LandTransactionService landTransactionService;


    @GetMapping("/all-departments")
    public List<String> getAllDepartments() {
        return landTransactionService.getAllDepartments();
    }

    @GetMapping("all-property-types")
    public List<String> getAllPropertyTypes() {
        return landTransactionService.getAllPropertyTypes();
    }

    @GetMapping
    public Page<LandTransactionDTO> getAll(
            @PageableDefault(size = 20, sort = "mutationDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return landTransactionService.getAll(pageable);
    }

    @GetMapping("/search")
    public Page<LandTransactionDTO> search(
            @RequestParam String term,
            @PageableDefault(size = 20, sort = "mutationDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return landTransactionService.search(term, pageable);
    }

    @GetMapping("/stats/monthly")
    public List<MarketMonthlyStatDTO> getMonthlyStats() {return landTransactionService.getMonthlyStats();}

    @GetMapping("/stats/price-monthly")
    public List<MarketPriceMonthlyStatDTO> getPriceMonthlyStats() {return landTransactionService.getPriceMonthlyStats();}

    @GetMapping("/stats/department")
    public List<DepartmentStatDTO> getDepartmentStats() {return landTransactionService.getDepartmentStats();}

    @PostMapping("/search-filters")
    public Page<LandTransactionDTO> searchWithFilters(@RequestBody LandTransactionFilterDto filters) {return landTransactionService.searchWithFilters(filters);}

    // TODO route non utilisée pour le moment
    @GetMapping("/stats/avg-price-city")
    public List<Map<String, Object>> getCityStats() {
        return landTransactionService.getCityStatistics();
    }
}
