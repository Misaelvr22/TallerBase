package com.back.backend.repository;

import com.back.backend.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrabajadorRepository extends JpaRepository<Trabajador, Integer> {
    boolean existsByRfc(String rfc);
    boolean isBoss(int id);
}
