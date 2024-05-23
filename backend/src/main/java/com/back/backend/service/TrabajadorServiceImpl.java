package com.back.backend.service;

import com.back.backend.model.Trabajador;
import com.back.backend.repository.TrabajadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrabajadorServiceImpl implements TrabajadorService {
    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @Override
    public Trabajador saveTrabajador(Trabajador trabajador){
        return trabajadorRepository.save(trabajador);
    }




}
