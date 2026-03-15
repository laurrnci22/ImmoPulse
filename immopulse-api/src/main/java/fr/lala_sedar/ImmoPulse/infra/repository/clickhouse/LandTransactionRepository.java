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

    public List<Map<String, Object>> getAveragePriceByCity() {
        String sql = "SELECT city, avg(property_value) as avg_price " +
                "FROM land_transaction " +
                "GROUP BY city " +
                "ORDER BY avg_price DESC " +
                "LIMIT 10";
        return jdbcTemplate.queryForList(sql);
    }

    public List<LandTransactionEntity> search(String term, Pageable pageable) {
        int limit = pageable.getPageSize();
        long offset = pageable.getOffset();

        StringBuilder sql = new StringBuilder("SELECT * FROM land_transaction WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (term != null && !term.isBlank()) {
            // Découper la recherche en mots
            String[] tokens = term.split("\\s+");

            for (String token : tokens) {
                sql.append(" AND (")
                        .append("property_type ILIKE ? OR ")
                        .append("mutation_type ILIKE ? OR ")
                        .append("city ILIKE ? OR ")
                        .append("postal_code ILIKE ? OR ")
                        .append("street_name ILIKE ?")
                        .append(")");

                String pattern = "%" + token + "%";
                params.add(pattern);
                params.add(pattern);
                params.add(pattern);
                params.add(pattern);
                params.add(pattern);
            }
        }

        sql.append(" LIMIT ? OFFSET ?");
        params.add(limit);
        params.add(offset);

        return jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(LandTransactionEntity.class),
                params.toArray()
        );
    }

    public long count(String term) {
        String sql = "SELECT count() FROM land_transaction";

        if (!term.isEmpty()) {
            sql += " WHERE property_type = ?";
            Long count = jdbcTemplate.queryForObject(sql, Long.class, term);
            return count != null ? count : 0L;
        }

        Long count = jdbcTemplate.queryForObject(sql, Long.class);
        return count != null ? count : 0L;
    }

    public List<LandTransactionEntity> getAll(Pageable pageable) {
        int limit = pageable.getPageSize();
        long offset = pageable.getOffset();

        String sql = "SELECT * FROM land_transaction LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(LandTransactionEntity.class), limit, offset);
    }

    public MarketSummaryDTO getGlobalStats(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("""
            SELECT
                count() AS totalTransactions,
                avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm,
                avg(property_value) AS avgPrice,
                sum(property_value) AS totalVolume
            FROM land_transaction
            WHERE 1=1
        """);

        List<Object> params = new ArrayList<>();

        if (departement != null && !departement.isBlank() && !departement.equalsIgnoreCase("all")) {
            sql.append(" AND lower(department_code) = ?");
            params.add(departement.toLowerCase());
        }

        if (propertyType != null && !propertyType.isBlank() && !propertyType.equalsIgnoreCase("all")) {
            sql.append(" AND lower(property_type) = ?");
            params.add(propertyType.toLowerCase());
        }

        return jdbcTemplate.queryForObject(
                sql.toString(),
                (rs, rowNum) -> new MarketSummaryDTO(
                        rs.getLong("totalTransactions"),
                        rs.getDouble("avgPricePerSqm"),
                        rs.getDouble("avgPrice"),
                        rs.getDouble("totalVolume")
                ),
                params.toArray()
        );
    }


    public List<MarketMonthlyStatDTO> getMonthlyStats() {
        String sql = """
        SELECT
            formatDateTime(toStartOfMonth(mutation_date), '%Y-%m') as month,
            count() as sales
        FROM land_transaction
        WHERE mutation_date >= subtractYears(now(), 1)
        GROUP BY toStartOfMonth(mutation_date)
        ORDER BY toStartOfMonth(mutation_date) ASC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new MarketMonthlyStatDTO(
                        rs.getString("month"),
                        rs.getLong("sales")
                )
        );
    }

    public List<MarketPriceMonthlyStatDTO> getMonthlyStatsWithAvgPricePerSqm() {
        String sql = """
        SELECT
            formatDateTime(toStartOfMonth(mutation_date), '%Y-%m') AS month,
            count() AS sales,
            avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm
        FROM land_transaction
        WHERE mutation_date >= subtractYears(now(), 1)
        GROUP BY toStartOfMonth(mutation_date)
        ORDER BY toStartOfMonth(mutation_date) ASC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new MarketPriceMonthlyStatDTO(
                        rs.getString("month"),
                        rs.getLong("sales"),
                        rs.getDouble("avgPricePerSqm")
                )
        );
    }

    public List<DepartmentStatDTO> getDepartmentStats() {
        String sql = """
        WITH monthly_avg AS (
            SELECT
                department_code,
                toStartOfMonth(mutation_date) AS month,
                avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm,
                avg(property_value) AS avgPrice,
                count(*) AS sales
            FROM land_transaction
            WHERE mutation_date >= subtractMonths(now(), 12)
            GROUP BY department_code, month
        )
        SELECT
            department_code AS departmentCode,
            avgPricePerSqm AS avgPricePerSqm,
            avgPrice AS avgPrice,
            sales AS totalSales,
            round(
                (avgPricePerSqm - lagInFrame(avgPricePerSqm) 
                 OVER (PARTITION BY department_code ORDER BY month))
                / lagInFrame(avgPricePerSqm) 
                 OVER (PARTITION BY department_code ORDER BY month) * 100,
                2
            ) AS priceEvolution
        FROM monthly_avg
        ORDER BY totalSales DESC
        """;

        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new DepartmentStatDTO(
                        rs.getString("departmentCode"),
                        rs.getDouble("avgPricePerSqm"),
                        rs.getDouble("avgPrice"),
                        rs.getLong("totalSales"),
                        rs.getDouble("priceEvolution")
                )
        );
    }

    public List<String> getAllDepartments() {
        String sql = "SELECT DISTINCT department_code AS code FROM land_transaction";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("code"));
    }

    public List <String> getAllPropertyTypes() {
        String sql = "SELECT DISTINCT if(length(trim(ifNull(property_type, ''))) = 0, 'Autre', property_type) AS type FROM land_transaction";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String type = rs.getString("type");
            if (type == null || type.isBlank()) {
                return "Autre";
            }
            return type;
        });
    }


    public List<PropertyDistributionDTO> getPropertyDistribution(String departement, String propertyType) {
        StringBuilder sql = new StringBuilder("""
            SELECT
                property_type AS propertyType,
                count() AS count
            FROM land_transaction
            WHERE 1=1
        """);

        List<Object> params = new ArrayList<>();

        if (departement != null && !departement.isBlank() && !departement.equalsIgnoreCase("all")) {
            sql.append(" AND lower(department_code) = ?");
            params.add(departement.toLowerCase());
        }

        if (propertyType != null && !propertyType.isBlank() && !propertyType.equalsIgnoreCase("all")) {
            sql.append(" AND lower(property_type) = ?");
            params.add(propertyType.toLowerCase());
        }

        sql.append(" GROUP BY property_type ORDER BY count DESC");

        return jdbcTemplate.query(sql.toString(), (rs, rowNum) ->
                new PropertyDistributionDTO(
                        rs.getString("propertyType"),
                        rs.getLong("count")
                ),
                params.toArray()
        );
    }

    public List<LandTransactionEntity> searchWithFilters(LandTransactionFilterDto filters, Pageable pageable) {
        int limit = pageable.getPageSize();
        long offset = pageable.getOffset();

        StringBuilder sql = new StringBuilder("SELECT * FROM land_transaction WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (filters.getType() != null && !filters.getType().isBlank()
                && !filters.getType().equalsIgnoreCase("all")) {
            sql.append(" AND lower(property_type) = ?");
            params.add(filters.getType().toLowerCase());
        }

        if (filters.getDepartment() != null && !filters.getDepartment().isBlank()
                && !filters.getDepartment().equalsIgnoreCase("all")) {
            sql.append(" AND lower(department_code) = ?");
            params.add(filters.getDepartment().toLowerCase());
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

        sql.append(" LIMIT ? OFFSET ?");
        params.add(limit);
        params.add(offset);

        return jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(LandTransactionEntity.class),
                params.toArray()
        );
    }

    public long countWithFilters(LandTransactionFilterDto filters) {
        StringBuilder sql = new StringBuilder("SELECT count() FROM land_transaction WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (filters.getType() != null && !filters.getType().isBlank()
                && !filters.getType().equalsIgnoreCase("all")) {
            sql.append(" AND lower(property_type) = ?");
            params.add(filters.getType().toLowerCase());
        }

        if (filters.getDepartment() != null && !filters.getDepartment().isBlank()
                && !filters.getDepartment().equalsIgnoreCase("all")) {
            sql.append(" AND lower(department_code) = ?");
            params.add(filters.getDepartment().toLowerCase());
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

        Long count = jdbcTemplate.queryForObject(sql.toString(), Long.class, params.toArray());
        return count != null ? count : 0L;
    }
}
