package com.back.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @Column(name = "Id_obra", length = 4, nullable = false, unique = true)
    private String idObra;

    @Column(name = "Direccion", length = 50, nullable = false)
    private String direccion;

    @Column(name = "Tipo", length = 20, nullable = false)
    private String tipo;

    @OneToMany(mappedBy = "obra")
    @JsonIgnore
    private Set<Asignacion> asignaciones = new HashSet<>();

}
