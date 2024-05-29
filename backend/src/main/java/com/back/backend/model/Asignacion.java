package com.back.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "asignacion")
public class Asignacion {

    @EmbeddedId
    private AsignacionPK idAsignacion;

    @Column(name = "dias")
    private int dias;

    // Relationship mappings (optional):
    @ManyToOne
    @JoinColumn(name = "idTrabajador", insertable = false, updatable = false)
    private Trabajador trabajador;

    @ManyToOne
    @JoinColumn(name = "idObra", insertable = false, updatable = false)
    private Obra obra;
}
