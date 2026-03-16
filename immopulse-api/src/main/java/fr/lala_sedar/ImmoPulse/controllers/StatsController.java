package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.domain.service.StatsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService service;


    @GetMapping("/global")
    public MarketSummaryDTO getStats(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getGlobalStats(department, propertyType);
    }

    @GetMapping("/property-distribution")
    public List<PropertyDistributionDTO> getPropertyDistribution(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getPropertyDistribution(department, propertyType);
    }

    @GetMapping("/market-stats")
    public List<MarketStatDTO> getMarketStats(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getMarketStats(department, propertyType);
    }



    @GetMapping("/price-surface")
    public List<PriceSurfaceDTO> getPriceSurface(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType,
        //    @RequestParam(required = false, name = "limit", defaultValue = "1000") Integer limit
            @RequestParam(required = false, name = "limit") Integer limit

    ) {
        return service.getPriceSurface(department, propertyType, limit);
    }


    @GetMapping("/department-volume")
    public List<DeptVolumeDTO> getDeptVolume(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getDeptVolume(department, propertyType);
    }


    @GetMapping("/volume-evolution")
    public List<VolumeEvolutionDTO> getVolumeEvolution(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        return service.getVolumeEvolution(department, propertyType);
    }

    @GetMapping("/department-table")
    public List<DeptTableDTO> getDepartmentTable() {
        return service.getDepartmentTable();
    }

}
