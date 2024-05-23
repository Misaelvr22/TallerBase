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
}
