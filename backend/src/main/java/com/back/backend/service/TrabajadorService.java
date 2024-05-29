package com.back.backend.service;

import com.back.backend.model.Trabajador;

import java.util.List;

public interface TrabajadorService {
    public Trabajador saveTrabajador(Trabajador trabajador);
    public List<Trabajador> getAllTrabajadores();
    public boolean existsByRfc(String rfc);
    public Trabajador findById(int id);
    void deleteTrabajador(int id);
}
