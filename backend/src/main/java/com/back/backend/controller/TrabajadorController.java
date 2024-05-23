package com.back.backend.controller;

import com.back.backend.model.Trabajador;
import com.back.backend.service.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trabajador")
public class TrabajadorController {
    @Autowired
    private TrabajadorService trabajadorService;

    @PostMapping("/add")
    public String addTrabajador(@RequestBody Trabajador trabajador) {
        trabajadorService.saveTrabajador(trabajador);
        return "Trabajador added";
    }
}
