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
    public ResponseEntity<String>addObra(@RequestBody Obra obra){
        //Check if the IdObra already exists in the database
        if (obraService.existsByidObra(obra.getIdObra())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("IdObra alredy exists. Obra not added.");
        }

        obraService.saveObra(obra);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Obra added successfully");

    }

    @GetMapping("/getAll")
    public List<Obra> getAllobras() {
        return obraService.getAllObras();

    }

    }
