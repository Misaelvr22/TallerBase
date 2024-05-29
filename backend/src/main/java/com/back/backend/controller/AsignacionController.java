package com.back.backend.controller;

import com.back.backend.model.Asignacion;
import com.back.backend.repository.AsignacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asignacion")
public class AsignacionController {
    @Autowired
    private AsignacionRepository asignacionRepository;

    @PostMapping("/add")
    public Asignacion addAsignacion(@RequestBody Asignacion asignacion) {
        return asignacionRepository.save(asignacion);
    }


    @GetMapping("/getAll")
    public List<Asignacion> getAllAsignacion() {
        return asignacionRepository.findAll();
    }
}
