package fr.lala_sedar.ImmoPulse.infra.repository;

import fr.lala_sedar.ImmoPulse.infra.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {
}