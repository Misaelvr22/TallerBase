package com.back.backend.controller;

import com.back.backend.model.Asignacion;
import com.back.backend.repository.AsignacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/asignacion")
public class AsignacionController {
    @Autowired
    private AsignacionRepository asignacionRepository;

//    @PostMapping("/add")
//    public ResponseEntity<String> addAsignacion(@RequestBody Asignacion asignacion) {
//        asignacionRepository.save(asignacion);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                .body("Asignacion added sucessfully");
//    }
}
