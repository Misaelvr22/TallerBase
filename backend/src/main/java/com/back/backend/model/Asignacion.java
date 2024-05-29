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
public class Asignacion {

    @Id
    @ManyToOne
    @JoinColumn(name = "idTrabajador")
    private Trabajador trabajador;

    @Id
    @ManyToOne
    @JoinColumn(name = "idObra")
    private Obra obra;

    @Column(name = "dias")
    private int dias;
}

