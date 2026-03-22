package fr.lala_sedar.ImmoPulse.infra.repository.clickhouse;

import fr.lala_sedar.ImmoPulse.controllers.dto.in.LandTransactionFilterDto;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.*;
import fr.lala_sedar.ImmoPulse.infra.entity.LandTransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class LandTransactionRepository {

    @Autowired
    @Qualifier("clickhouseJdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    private void applyBaseFilters(StringBuilder sql, List<Object> params, String departement, String propertyType) {
        if (departement != null && !departement.isBlank() && !departement.equalsIgnoreCase("all")) {
            sql.append(" AND department_code = ?");
            params.add(departement.toUpperCase());
        }
        if (propertyType != null && !propertyType.isBlank() && !propertyType.equalsIgnoreCase("all")) {
            sql.append(" AND property_type = ?");
            params.add(propertyType);
        }
    }

    private void applyAdvancedFilters(StringBuilder sql, List<Object> params, LandTransactionFilterDto filters) {
        if (filters.getType() != null && !filters.getType().isBlank() && !filters.getType().equalsIgnoreCase("all")) {
            sql.append(" AND property_type = ?");
            params.add(filters.getType());
        }
        if (filters.getDepartment() != null && !filters.getDepartment().isBlank() && !filters.getDepartment().equalsIgnoreCase("all")) {
            sql.append(" AND department_code = ?");
            params.add(filters.getDepartment().toUpperCase());
        }
        if (filters.getMinPrice() != null) {
            sql.append(" AND property_value >= ?");
            params.add(filters.getMinPrice());
        }
        if (filters.getMaxPrice() != null) {
            sql.append(" AND property_value <= ?");
            params.add(filters.getMaxPrice());
        }
        if (filters.getMinSurface() != null && filters.getMinSurface() > 0) {
            sql.append(" AND built_area >= ?");
            params.add(filters.getMinSurface());
        }
    }

    public List<LandTransactionEntity> getAll(Pageable pageable) {
        String sql = "SELECT * FROM land_transaction LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(LandTransactionEntity.class), pageable.getPageSize(), pageable.getOffset());
    }

    public List<LandTransactionEntity> search(String term, Pageable pageable) {
        StringBuilder sql = new StringBuilder("SELECT * FROM land_transaction PREWHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (term != null && !term.isBlank()) {
            String[] tokens = term.split("\\s+");
            for (String token : tokens) {
                sql.append(" AND (property_type ILIKE ? OR mutation_type ILIKE ? OR city ILIKE ? OR postal_code ILIKE ? OR street_name ILIKE ?)");
                String pattern = "%" + token + "%";
                for (int i = 0; i < 5; i++) params.add(pattern);
            }
        }

        sql.append(" LIMIT ? OFFSET ?");
        params.add(pageable.getPageSize());
        params.add(pageable.getOffset());

        return jdbcTemplate.query(sql.toString(), new BeanPropertyRowMapper<>(LandTransactionEntity.class), params.toArray());
    }

    public long count(String term) {
        if (term == null || term.isBlank()) {
            Long count = jdbcTemplate.queryForObject("SELECT count() FROM land_transaction", Long.class);
            return count != null ? count : 0L;
        }
        Long count = jdbcTemplate.queryForObject("SELECT count() FROM land_transaction PREWHERE property_type = ?", Long.class, term);
        return count != null ? count : 0L;
    }

    public List<LandTransactionEntity> searchWithFilters(LandTransactionFilterDto filters, Pageable pageable) {
        StringBuilder sql = new StringBuilder("SELECT * FROM land_transaction PREWHERE 1=1");
        List<Object> params = new ArrayList<>();

        applyAdvancedFilters(sql, params, filters);

        sql.append(" LIMIT ? OFFSET ?");
        params.add(pageable.getPageSize());
        params.add(pageable.getOffset());

        return jdbcTemplate.query(sql.toString(), new BeanPropertyRowMapper<>(LandTransactionEntity.class), params.toArray());
    }

    public long countWithFilters(LandTransactionFilterDto filters) {
        StringBuilder sql = new StringBuilder("SELECT count() FROM land_transaction PREWHERE 1=1");
        List<Object> params = new ArrayList<>();

        applyAdvancedFilters(sql, params, filters);

        Long count = jdbcTemplate.queryForObject(sql.toString(), Long.class, params.toArray());
        return count != null ? count : 0L;
    }

    public List<String> getAllDepartments() {
        return jdbcTemplate.query("SELECT DISTINCT department_code AS code FROM land_transaction", (rs, rowNum) -> rs.getString("code"));
    }

    public List<String> getAllPropertyTypes() {
        String sql = "SELECT DISTINCT if(length(trim(ifNull(property_type, ''))) = 0, 'Autre', property_type) AS type FROM land_transaction";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String type = rs.getString("type");
            return (type == null || type.isBlank()) ? "Autre" : type;
        });
    }

    public List<Map<String, Object>> getAveragePriceByCity() {
        String sql = "SELECT city, avg(property_value) as avg_price FROM land_transaction GROUP BY city ORDER BY avg_price DESC LIMIT 10";
        return jdbcTemplate.queryForList(sql);
    }

    public List<MarketMonthlyStatDTO> getMonthlyStats() {
        String sql = """
            SELECT formatDateTime(toStartOfMonth(mutation_date), '%Y-%m') as month, count() as sales
            FROM land_transaction
            WHERE mutation_date >= subtractYears(now(), 1)
            GROUP BY toStartOfMonth(mutation_date) ORDER BY toStartOfMonth(mutation_date) ASC
        """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> new MarketMonthlyStatDTO(rs.getString("month"), rs.getLong("sales")));
    }

    public List<MarketPriceMonthlyStatDTO> getMonthlyStatsWithAvgPricePerSqm() {
        String sql = """
            SELECT formatDateTime(toStartOfMonth(mutation_date), '%Y-%m') AS month, count() AS sales,
                   avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm
            FROM land_transaction
            WHERE mutation_date >= subtractYears(now(), 1)
            GROUP BY toStartOfMonth(mutation_date) ORDER BY toStartOfMonth(mutation_date) ASC
        """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> new MarketPriceMonthlyStatDTO(
                rs.getString("month"), rs.getLong("sales"), rs.getDouble("avgPricePerSqm")
        ));
    }

    public List<DepartmentStatDTO> getDepartmentStats() {
        String sql = """
            WITH monthly_avg AS (
                SELECT department_code, toStartOfMonth(mutation_date) AS month,
                       avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm,
                       avg(property_value) AS avgPrice, count(*) AS sales
                FROM land_transaction
                WHERE mutation_date >= subtractMonths(now(), 12)
                GROUP BY department_code, month
            )
            SELECT department_code AS departmentCode, avgPricePerSqm AS avgPricePerSqm, avgPrice AS avgPrice, sales AS totalSales,
                   round((avgPricePerSqm - lagInFrame(avgPricePerSqm) OVER (PARTITION BY department_code ORDER BY month))
                   / nullIf(lagInFrame(avgPricePerSqm) OVER (PARTITION BY department_code ORDER BY month), 0) * 100, 2) AS priceEvolution
            FROM monthly_avg
            ORDER BY totalSales DESC
        """;
        return jdbcTemplate.query(sql, (rs, rowNum) -> new DepartmentStatDTO(
                rs.getString("departmentCode"), rs.getDouble("avgPricePerSqm"), rs.getDouble("avgPrice"),
                rs.getLong("totalSales"), rs.getDouble("priceEvolution")
        ));
    }

    public List<DeptTableDTO> getDepartmentTable() {
        String sql = """
            SELECT 
                department_code AS departmentCode, 
                sum(monthly_sales) AS totalTransactions,
                avg(monthly_sqm_price) AS avgPricePerSqm, 
                avg(monthly_price) AS avgPrice,
                round(
                    (argMax(monthly_sqm_price, month) - argMin(monthly_sqm_price, month)) 
                    / nullIf(argMin(monthly_sqm_price, month), 0) * 100, 
                2) AS priceEvolution
            FROM (
                SELECT 
                    department_code, 
                    toStartOfMonth(mutation_date) AS month, 
                    count() AS monthly_sales,
                    avg(property_value / nullIf(built_area, 0)) AS monthly_sqm_price,
                    avg(property_value) AS monthly_price
                FROM land_transaction
                WHERE mutation_date >= subtractMonths(now(), 12)
                GROUP BY department_code, month
            )
            GROUP BY department_code 
            ORDER BY totalTransactions DESC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> new DeptTableDTO(
                rs.getString("departmentCode"),
                rs.getDouble("avgPricePerSqm"),
                rs.getDouble("avgPrice"),
                rs.getLong("totalTransactions"),
                rs.getObject("priceEvolution") != null ? rs.getDouble("priceEvolution") : 0.0
        ));
    }

    public MarketSummaryDTO getGlobalStats(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("""
            SELECT count() AS totalTransactions,
                   avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm,
                   avg(property_value) AS avgPrice,
                   sum(property_value) AS totalVolume
            FROM land_transaction PREWHERE 1=1
        """);
        List<Object> params = new ArrayList<>();
        applyBaseFilters(sql, params, departement, propertyType);

        return jdbcTemplate.queryForObject(sql.toString(), (rs, rowNum) -> new MarketSummaryDTO(
                rs.getLong("totalTransactions"), rs.getDouble("avgPricePerSqm"), rs.getDouble("avgPrice"), rs.getDouble("totalVolume")
        ), params.toArray());
    }

    public List<PropertyDistributionDTO> getPropertyDistribution(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("SELECT property_type AS propertyType, count() AS count FROM land_transaction PREWHERE 1=1");
        List<Object> params = new ArrayList<>();

        applyBaseFilters(sql, params, departement, propertyType);
        sql.append(" GROUP BY property_type ORDER BY count DESC");

        return jdbcTemplate.query(sql.toString(), (rs, rowNum) -> new PropertyDistributionDTO(
                rs.getString("propertyType"), rs.getLong("count")
        ), params.toArray());
    }

    public List<MarketStatDTO> getMarketStats(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("""
            SELECT formatDateTime(toStartOfMonth(mutation_date), '%Y-%m') AS month,
                   count() AS volumeVentes,
                   round(avg(property_value / nullIf(built_area, 0)), 2) AS prixMoyen
            FROM land_transaction PREWHERE 1=1
        """);
        List<Object> params = new ArrayList<>();
        applyBaseFilters(sql, params, departement, propertyType);
        sql.append(" GROUP BY toStartOfMonth(mutation_date) ORDER BY toStartOfMonth(mutation_date) ASC");

        return jdbcTemplate.query(sql.toString(), (rs, rowNum) -> new MarketStatDTO(
                rs.getString("month"), rs.getLong("volumeVentes"), rs.getDouble("prixMoyen")
        ), params.toArray());
    }

    public List<PriceSurfaceDTO> getPriceSurface(String departement, String propertyType, Integer limit) {
        StringBuilder sql = new StringBuilder("""
            SELECT department_code AS departmentCode,
                   built_area AS surface,
                   property_type AS type,
                   round(avg(property_value) , 2) AS prix
            FROM land_transaction
            PREWHERE built_area IS NOT NULL AND built_area > 0
        """);
        List<Object> params = new ArrayList<>();
        applyBaseFilters(sql, params, departement, propertyType);
        sql.append(" GROUP BY department_code, built_area, property_type ORDER BY built_area ASC");

        if (limit != null && limit > 0) {
            sql.append(" LIMIT ?");
            params.add(limit);
        }
        return jdbcTemplate.query(sql.toString(), (rs, rowNum) -> new PriceSurfaceDTO(
                rs.getString("departmentCode"), rs.getLong("surface"), rs.getString("type"), rs.getDouble("prix")
        ), params.toArray());
    }

    public List<DeptVolumeDTO> getDeptVolume(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("""
            SELECT department_code AS departmentCode, sum(built_area) AS volume
            FROM land_transaction
            PREWHERE built_area IS NOT NULL AND built_area > 0
        """);
        List<Object> params = new ArrayList<>();
        applyBaseFilters(sql, params, departement, propertyType);
        sql.append(" GROUP BY department_code ORDER BY volume DESC");

        return jdbcTemplate.query(sql.toString(), (rs, rowNum) -> new DeptVolumeDTO(
                rs.getString("departmentCode"), rs.getLong("volume")
        ), params.toArray());
    }

    public List<VolumeEvolutionDTO> getVolumeEvolution(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("""
            SELECT formatDateTime(toStartOfMonth(mutation_date), '%Y-%m') AS month,
                   property_type AS type,
                   count() AS volume
            FROM land_transaction
            WHERE mutation_date >= subtractYears(now(), 1)
        """);
        List<Object> params = new ArrayList<>();
        applyBaseFilters(sql, params, departement, propertyType);
        sql.append(" GROUP BY toStartOfMonth(mutation_date), property_type ORDER BY toStartOfMonth(mutation_date) ASC");

        return jdbcTemplate.query(sql.toString(), rs -> {
            Map<String, Map<String, Long>> groupedByMonth = new java.util.LinkedHashMap<>();
            while (rs.next()) {
                String month = rs.getString("month");
                String type = rs.getString("type");
                if (type == null || type.isBlank()) type = "Autre";

                groupedByMonth.putIfAbsent(month, new java.util.HashMap<>());
                groupedByMonth.get(month).put(type, rs.getLong("volume"));
            }
            return groupedByMonth.entrySet().stream()
                    .map(entry -> new VolumeEvolutionDTO(entry.getKey(), entry.getValue()))
                    .toList();
        }, params.toArray());
    }
}
