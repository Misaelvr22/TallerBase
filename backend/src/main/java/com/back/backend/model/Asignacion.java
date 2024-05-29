package com.back.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "asignacion")
//@IdClass(AsignacionPK.class)
public class Asignacion {

    @EmbeddedId
    private AsignacionPK idAsignacion;


//    @Id
//    @ManyToOne
//    @JoinColumn(name = "idTrabajador")
//    private Trabajador trabajador;
//
//    @Id
//    @ManyToOne
//    @JoinColumn(name = "idObra")
//    private Obra obra;

    @Column(name = "dias")
    private int dias;

    @ManyToOne
    @JoinColumn(name = "idTrabajador", insertable = false, updatable = false)
    private Trabajador trabajador;

    @ManyToOne
    @JoinColumn(name = "idObra", insertable = false, updatable = false)
    private Obra obra;
}

