package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.service.LandTransactionService;
import fr.lala_sedar.ImmoPulse.domain.service.StatsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService service;


    @GetMapping("/global")
    public MarketSummaryDTO getStats(
            @RequestParam(required = false, name = "departement") String departement,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getGlobalStats(departement, propertyType);
    }

    @GetMapping("/property-distribution")
    public List<PropertyDistributionDTO> getPropertyDistribution(
            @RequestParam(required = false, name = "departement") String departement,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getPropertyDistribution(departement, propertyType);
    }

}
