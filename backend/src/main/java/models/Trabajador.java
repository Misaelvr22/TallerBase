package models;

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

    @Column(name = "Usuario")
    private String usuario;

    @Column(name = "Password")
    private String password;

    @Id
    @Column(name = "Id_trab")
    private int id;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Sueldo_hr")
    private float sueldo_hr;

    @Column(name = "Fecha_ingreso")
    private Date fecha_ingreso;

    @Column(name = "Oficio")
    private String oficio;

    @Column(name = "RFC")
    private String rfc;

    @OneToMany(mappedBy = "trabajador")
    private Set<Asignacion> asignaciones = new HashSet<>();
}
