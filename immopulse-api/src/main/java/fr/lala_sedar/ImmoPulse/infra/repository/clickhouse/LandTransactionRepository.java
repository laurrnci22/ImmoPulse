package fr.lala_sedar.ImmoPulse.infra.repository.clickhouse;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.DepartmentStatDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.MarketMonthlyStatDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.MarketPriceMonthlyStatDTO;
import fr.lala_sedar.ImmoPulse.controllers.dto.out.MarketSummaryDTO;
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

    public MarketSummaryDTO getGlobalStats() {
        String sql = """
        WITH
        last_12_months AS (
            SELECT 
                avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm,
                avg(property_value) AS avgPrice,
                count() AS totalTransactions,
                sum(property_value) AS totalVolume
            FROM land_transaction
            WHERE mutation_date >= subtractMonths(now(), 12)
        ),
        previous_12_months AS (
            SELECT 
                avg(property_value / nullIf(built_area, 0)) AS avgPricePerSqm,
                avg(property_value) AS avgPrice
            FROM land_transaction
            WHERE mutation_date >= subtractMonths(now(), 24)
              AND mutation_date < subtractMonths(now(), 12)
        )
        SELECT
            l.totalTransactions,
            l.avgPricePerSqm,
            l.avgPrice,
            l.totalVolume,
            round((l.avgPrice - p.avgPrice) / p.avgPrice * 100, 2) AS yearOverYearChange
        FROM last_12_months l
        CROSS JOIN previous_12_months p
        """;

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new MarketSummaryDTO(
                rs.getLong("totalTransactions"),
                rs.getDouble("avgPricePerSqm"),
                rs.getDouble("avgPrice"),
                rs.getDouble("totalVolume"),
                rs.getDouble("yearOverYearChange")
        ));
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
}