package com.back.backend.controller;

import com.back.backend.model.Asignacion;
import com.back.backend.model.AsignacionPK;
import com.back.backend.repository.AsignacionRepository;
import com.back.backend.repository.ObraRepository;
import com.back.backend.repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asignacion")
public class AsignacionController {
    @Autowired
    private AsignacionRepository asignacionRepository;

    @Autowired
    private ObraRepository obraRepository; // Agrega esta variable

    @Autowired
    private TrabajadorRepository trabajadorRepository; // Agrega esta variable

    @PostMapping("/add")
    public ResponseEntity<String> addAsignacion(@RequestBody Asignacion asignacion) {

        if(!obraRepository.existsById(asignacion.getIdAsignacion().getIdObra()) && !trabajadorRepository.existsById(asignacion.getIdAsignacion().getIdTrabajador())){
            return ResponseEntity.badRequest().body("El trabajador y la obra no existe.");
        }

        if (!obraRepository.existsById(asignacion.getIdAsignacion().getIdObra())) {
            return ResponseEntity.badRequest().body("El idObra no existe.");
        }

        if (!trabajadorRepository.existsById(asignacion.getIdAsignacion().getIdTrabajador())) {
            return ResponseEntity.badRequest().body("El idTrabajador no existe.");
        }

        boolean obraExists = obraRepository.existsById(asignacion.getIdAsignacion().getIdObra());

        if (obraExists) {
            return ResponseEntity.badRequest().body("La obra con idObra " + asignacion.getIdAsignacion().getIdObra() + "-" + asignacion.getIdAsignacion().getIdTrabajador()+ " ya está registrada.");
        }
        // Guardar la asignación si ambos valores existen
        asignacionRepository.save(asignacion);
        return ResponseEntity.ok("Asignación guardada correctamente.");
    }



    @GetMapping("/getAll")
    public List<Asignacion> getAllAsignacion() {
        return asignacionRepository.findAll();
    }

    @DeleteMapping("/delete/{idTrabajador}/{idObra}")
    public ResponseEntity<String> deleteAsignacion(@PathVariable int idTrabajador, @PathVariable String idObra) {
        AsignacionPK asignacionId = new AsignacionPK(idTrabajador, idObra);

        if (!asignacionRepository.existsById(asignacionId)) {
            return ResponseEntity.badRequest().body("La asignación con ID " + idTrabajador + "-" + idObra + " no existe.");
        }

        asignacionRepository.deleteById(asignacionId);
        return ResponseEntity.ok("Asignación con ID " + idTrabajador + "-" + idObra + " eliminada correctamente.");
    }



}
