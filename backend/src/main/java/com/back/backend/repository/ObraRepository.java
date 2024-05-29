package com.back.backend.repository;

import com.back.backend.model.Obra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ObraRepository extends JpaRepository<Obra, String> {
    boolean existsById(String id);


}