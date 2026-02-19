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

import java.util.List;
import java.util.Map;

@Repository
public class LandTransactionRepository {

    @Autowired
    @Qualifier("clickhouseJdbcTemplate")
    private JdbcTemplate jdbcTemplate; // Toujours mettre en private

    public List<LandTransactionEntity> findAll(int limit, int offset) {
        String sql = "SELECT * FROM land_transaction LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(LandTransactionEntity.class), limit, offset);
    }

    public List<Map<String, Object>> getAveragePriceByCity() {
        String sql = "SELECT city, avg(property_value) as avg_price " +
                "FROM land_transaction " +
                "GROUP BY city " +
                "ORDER BY avg_price DESC " +
                "LIMIT 10";
        return jdbcTemplate.queryForList(sql);
    }

    public List<LandTransactionEntity> findByCriteria(String departmentCode, String propertyType) {
        String sql = "SELECT * FROM land_transaction WHERE department_code = ? AND property_type = ? LIMIT 50";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(LandTransactionEntity.class), departmentCode, propertyType);
    }

    public long count() {
        String sql = "SELECT count() FROM land_transaction";
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