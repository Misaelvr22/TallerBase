package com.back.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
@Table(name = "trabajador")
@EntityListeners(AuditingEntityListener.class)
public class Trabajador {

    @Column(name = "Password")
    private String password;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_trab")
    private int idTrabajador;

    @Column(name = "Nombre", length = 40, nullable = false)
    private String nombre;

    @JsonIgnore
    @Column(name = "Sueldo_hr")
    private float sueldo_hr;

    @JsonIgnore
    @Column(name = "Fecha_ingreso")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String fecha_ingreso;

    @Column(name = "Oficio", length = 20, nullable = false)
    private String oficio;

    @Column(name = "RFC", length = 13, nullable = false, unique = true)
    private String rfc;

    @OneToMany(mappedBy = "trabajador")
    @JsonBackReference
    private Set<Asignacion> asignaciones;
}
