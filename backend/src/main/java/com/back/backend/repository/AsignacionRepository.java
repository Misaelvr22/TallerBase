package com.back.backend.repository;

import com.back.backend.model.Asignacion;
import com.back.backend.model.AsignacionPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AsignacionRepository extends JpaRepository<Asignacion, AsignacionPK> {
}
