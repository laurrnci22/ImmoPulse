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

/**
 * REST Controller for managing land transactions and real estate statistics.
 * Exposes endpoints to retrieve reference data, search transactions, and fetch aggregated stats.
 */
@Slf4j
@RestController
@RequestMapping("/api/land-transaction")
@RequiredArgsConstructor
public class LandTransactionController {

    private final LandTransactionService landTransactionService;

    /**
     * Retrieves the list of all available departments.
     *
     * @return 200 OK with the list of department codes.
     */
    @GetMapping("/all-departments")
    public List<String> getAllDepartments() {
        log.info("Fetching all departments");
        return landTransactionService.getAllDepartments();
    }

    /**
     * Retrieves the list of all available property types.
     *
     * @return 200 OK with the list of property types.
     */
    @GetMapping("/all-property-types")
    public List<String> getAllPropertyTypes() {
        log.info("Fetching all property types");
        return landTransactionService.getAllPropertyTypes();
    }

    /**
     * Retrieves a paginated list of all land transactions.
     *
     * @param pageable pagination and sorting information (default: 20 items, sorted by mutationDate DESC).
     * @return 200 OK with a page of transactions.
     */
    @GetMapping
    public Page<LandTransactionDTO> getAll(
            @PageableDefault(size = 20, sort = "mutationDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        log.info("Fetching all transactions with pagination: {}", pageable);
        return landTransactionService.getAll(pageable);
    }

    /**
     * Searches for land transactions based on a text term.
     * Note: Includes a random error simulation for frontend resilience testing.
     *
     * @param term     the search term.
     * @param pageable pagination and sorting information.
     * @return 200 OK with the search results, or 500 Internal Server Error (simulated).
     */
    @GetMapping("/search")
    public Page<LandTransactionDTO> search(
            @RequestParam String term,
            @PageableDefault(size = 20, sort = "mutationDate", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        log.info("Searching transactions with term: '{}', pagination: {}", term, pageable);

        // Random error simulation (approx. 20% chance to fail)
        if ((int) (Math.random() * 10) + 1 < 3) {
            log.error("Simulated random error occurred during search for term: {}", term);
            throw new RuntimeException("Error");
        }

        return landTransactionService.search(term, pageable);
    }

    /**
     * Searches for land transactions using advanced filters via a POST request body.
     *
     * @param filters the DTO containing filtering criteria (department, type, min/max price, etc.).
     * @return 200 OK with the filtered page of transactions.
     */
    @PostMapping("/search-filters")
    public Page<LandTransactionDTO> searchWithFilters(@RequestBody LandTransactionFilterDto filters) {
        log.info("Searching transactions with advanced filters");
        return landTransactionService.searchWithFilters(filters);
    }
}
