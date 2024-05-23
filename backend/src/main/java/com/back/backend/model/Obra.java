package com.back.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
@Table(name = "obra")
public class Obra {
    @Id
    @Column(name = "Id_obra")
    private String idObra;

    @Column(name = "Direccion")
    private String direccion;

    @Column(name = "Tipo")
    private String tipo;

    @OneToMany(mappedBy = "obra")
    private Set<Asignacion> asignaciones = new HashSet<>();

}
