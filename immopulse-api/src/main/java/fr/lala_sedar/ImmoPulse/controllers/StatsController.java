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
import java.util.Map;

/**
 * REST Controller for managing aggregated real estate statistics.
 * Exposes endpoints to feed the various charts, KPIs, and tables on the dashboard.
 * Most endpoints support optional filtering by department and property type.
 */
@Slf4j
@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService service;

    /**
     * Retrieves global market statistics (total volume, average price, etc.).
     * Used for the top KPI cards on the dashboard.
     *
     * @param department   optional department code filter (e.g., "75", "all").
     * @param propertyType optional property type filter (e.g., "Maison", "all").
     * @return 200 OK with the global market summary.
     */
    @GetMapping("/global")
    public MarketSummaryDTO getStats(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        log.info("Fetching global market stats [dept: {}, propertyType: {}]", department, propertyType);
        return service.getGlobalStats(department, propertyType);
    }

    /**
     * Retrieves the monthly volume of transactions (number of sales per month).
     *
     * @return 200 OK with the list of monthly stats.
     */
    @GetMapping("/stats/monthly")
    public List<MarketMonthlyStatDTO> getMonthlyStats() {
        log.info("Fetching monthly transaction volume statistics");
        return service.getMonthlyStats();
    }

    /**
     * Retrieves the monthly average price and price per square meter.
     *
     * @return 200 OK with the list of monthly price stats.
     */
    @GetMapping("/stats/price-monthly")
    public List<MarketPriceMonthlyStatDTO> getPriceMonthlyStats() {
        log.info("Fetching monthly average price statistics");
        return service.getPriceMonthlyStats();
    }

    /**
     * Retrieves aggregated market statistics grouped by department.
     *
     * @return 200 OK with the list of department statistics.
     */
    @GetMapping("/stats/department")
    public List<DepartmentStatDTO> getDepartmentStats() {
        log.info("Fetching department aggregated statistics");
        return service.getDepartmentStats();
    }

    /**
     * Retrieves the average transaction price aggregated by city.
     * TODO: Route non utilisée pour le moment côté frontend.
     *
     * @return 200 OK with a list of cities and their average prices.
     */
    @GetMapping("/stats/avg-price-city")
    public List<Map<String, Object>> getCityStats() {
        log.info("Fetching average price by city statistics");
        return service.getCityStatistics();
    }

    /**
     * Retrieves the distribution of transactions by property type (Houses vs Apartments, etc.).
     * Used for Pie/Donut charts.
     *
     * @param department   optional department code filter.
     * @param propertyType optional property type filter.
     * @return 200 OK with the distribution data.
     */
    @GetMapping("/property-distribution")
    public List<PropertyDistributionDTO> getPropertyDistribution(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        log.info("Fetching property distribution [dept: {}, propertyType: {}]", department, propertyType);
        return service.getPropertyDistribution(department, propertyType);
    }

    /**
     * Retrieves monthly market statistics (sales volume and average price).
     * Used for the main evolution line/bar charts.
     *
     * @param department   optional department code filter.
     * @param propertyType optional property type filter.
     * @return 200 OK with a list of monthly statistics.
     */
    @GetMapping("/market-stats")
    public List<MarketStatDTO> getMarketStats(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        log.info("Fetching market volume and average price stats [dept: {}, propertyType: {}]", department, propertyType);
        return service.getMarketStats(department, propertyType);
    }

    /**
     * Retrieves the correlation between price and surface area.
     * Used for scatter plots or correlation charts.
     *
     * @param department   optional department code filter.
     * @param propertyType optional property type filter.
     * @param limit        optional limit to restrict the number of data points returned.
     * @return 200 OK with price and surface data points.
     */
    @GetMapping("/price-surface")
    public List<PriceSurfaceDTO> getPriceSurface(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType,
            @RequestParam(required = false, name = "limit") Integer limit
    ) {
        log.info("Fetching price vs surface data [dept: {}, propertyType: {}, limit: {}]", department, propertyType, limit);
        return service.getPriceSurface(department, propertyType, limit);
    }

    /**
     * Retrieves the total built area (volume) transacted per department.
     * Used for geographical maps or bar charts comparing departments.
     *
     * @param department   optional department code filter.
     * @param propertyType optional property type filter.
     * @return 200 OK with total volumes grouped by department.
     */
    @GetMapping("/department-volume")
    public List<DeptVolumeDTO> getDeptVolume(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        log.info("Fetching total volume per department [dept: {}, propertyType: {}]", department, propertyType);
        return service.getDeptVolume(department, propertyType);
    }

    /**
     * Retrieves the evolution of transaction volumes over time.
     *
     * @param department   optional department code filter.
     * @param propertyType optional property type filter.
     * @return 200 OK with the volume evolution data.
     */
    @GetMapping("/volume-evolution")
    public List<VolumeEvolutionDTO> getVolumeEvolution(
            @RequestParam(required = false, name = "department") String department,
            @RequestParam(required = false, name = "propertyType") String propertyType
    ) {
        log.info("Fetching volume evolution over time [dept: {}, propertyType: {}]", department, propertyType);
        return service.getVolumeEvolution(department, propertyType);
    }

    /**
     * Retrieves a detailed ranking table of all departments with their aggregated stats.
     * Used for the "Palmarès des départements" data table.
     *
     * @return 200 OK with the detailed department statistics list.
     */
    @GetMapping("/department-table")
    public List<DeptTableDTO> getDepartmentTable() {
        log.info("Fetching detailed department ranking table");
        return service.getDepartmentTable();
    }
}
