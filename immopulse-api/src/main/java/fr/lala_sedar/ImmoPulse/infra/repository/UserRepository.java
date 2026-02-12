package fr.lala_sedar.ImmoPulse.infra.repository;

import fr.lala_sedar.ImmoPulse.infra.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserEntity, Long> {
}