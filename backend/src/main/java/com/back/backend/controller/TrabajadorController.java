package com.back.backend.controller;

import com.back.backend.model.Trabajador;
import com.back.backend.service.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trabajador")
public class TrabajadorController {
    @Autowired
    private TrabajadorService trabajadorService;

    @PostMapping("/add")
    public ResponseEntity<String> addTrabajador(@RequestBody Trabajador trabajador) {
        // Check if the RFC already exists in the database
        if (trabajadorService.existsByRfc(trabajador.getRfc())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("RFC already exists. Trabajador not added.");
        }

        trabajadorService.saveTrabajador(trabajador);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Trabajador added successfully.");
    }


    @GetMapping("/getAll")
    public List<Trabajador> getAllTrabajador() {
        return trabajadorService.getAllTrabajadores();
    }

    @PostMapping("/findTrabajador")
    public ResponseEntity<?> findTrabajador(@RequestParam String id) {
        try {
            int parsedId = Integer.parseInt(id); // Parse the ID
            Trabajador trabajador = trabajadorService.findById(parsedId);
            if (trabajador != null) {
                return ResponseEntity.ok(trabajador);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (NumberFormatException e) {
            // Handle invalid ID (e.g., non-integer input)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @PutMapping("/updateTrabajador/{id}")
    public ResponseEntity<String> updateTrabajador(@PathVariable int id, @RequestBody Trabajador updatedTrabajador) {
        Trabajador existingTrabajador = trabajadorService.findById(id);
        if (existingTrabajador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Trabajador not found.");
        }

        // Update relevant fields (e.g., name, salary, etc.) in existingTrabajador
        existingTrabajador.setNombre(updatedTrabajador.getNombre());
        existingTrabajador.setPassword(updatedTrabajador.getPassword());
        existingTrabajador.setRfc(updatedTrabajador.getRfc());
        existingTrabajador.setOficio(updatedTrabajador.getOficio());
        // ... (update other fields as needed)

        trabajadorService.saveTrabajador(existingTrabajador);
        return ResponseEntity.ok("Trabajador updated successfully.");
    }


    // Delete a Trabajador by ID
    @DeleteMapping("/deleteTrabajador/{id}")
    public ResponseEntity<String> deleteTrabajador(@PathVariable int id) {
        Trabajador existingTrabajador = trabajadorService.findById(id);
        if (existingTrabajador == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Trabajador not found.");
        }

        trabajadorService.deleteTrabajador(id);
        return ResponseEntity.ok("Trabajador deleted successfully.");
    }


}
