package fr.lala_sedar.ImmoPulse.infra.repository.clickhouse;

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
}