package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.LandTransactionDTO;
import fr.lala_sedar.ImmoPulse.domain.service.LandTransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public Collection<LandTransactionDTO> getAll() {
        log.info("Fetching all transactions");
        return landTransactionService.findAll();
    }

    @GetMapping("/stats/avg-price-city")
    public List<Map<String, Object>> getCityStats() {
        return landTransactionService.getCityStatistics();
    }

    @GetMapping("/search")
    public Collection<LandTransactionDTO> search(
            @RequestParam String dept,
            @RequestParam String type) {
        return landTransactionService.findByCriteria(dept, type);
    }
}