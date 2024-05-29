package com.back.backend.controller;

import com.back.backend.model.Obra;
import com.back.backend.model.Trabajador;
import com.back.backend.service.ObraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/obra")
public class ObraController {
    @Autowired
    private ObraService obraService;

    @PostMapping("/add")
    public ResponseEntity<String> addObra(@RequestBody Obra obra) {
        if (obraService.existsByidObra(obra.getIdObra())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Obra already exists. Obra not added.");
        }

        obraService.saveObra(obra);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Obra added successfully.");
    }


    @GetMapping("/getAll")
    public List<Obra> getAllobras() {
        return obraService.getAllObras();

    }
    @PutMapping("/updateObra/{id}")
    public ResponseEntity<String> updateTrabajador(@PathVariable String id, @RequestBody Obra updatedObra) {
        Obra existingObra = obraService.findByIdObra(id);
        if (existingObra == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Trabajador not found.");
        }

        // Update relevant fields (e.g., name, salary, etc.) in existingTrabajador
        existingObra.setTipo(updatedObra.getTipo());
        // ... (update other fields as needed)

        obraService.saveObra(existingObra);
        return ResponseEntity.ok("Trabajador updated successfully.");
    }



    @DeleteMapping("/deleteObra/{id}")
    public ResponseEntity<String> deleteObra(@PathVariable String id) {
        Obra existingObra = obraService.findByIdObra(id);
        if (existingObra == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Obra not found.");
        }

        obraService.deleteObra(id);
        return ResponseEntity.ok("Obra deleted successfully.");
    }





}
