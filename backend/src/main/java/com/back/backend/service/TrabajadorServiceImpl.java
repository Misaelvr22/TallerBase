package com.back.backend.service;

import com.back.backend.model.Trabajador;
import com.back.backend.repository.TrabajadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrabajadorServiceImpl implements TrabajadorService {
    @Autowired
    private TrabajadorRepository trabajadorRepository;

    @Override
    public Trabajador saveTrabajador(Trabajador trabajador){
        return trabajadorRepository.save(trabajador);
    }


    @Override
    public List<Trabajador> getAllTrabajadores(){
        return trabajadorRepository.findAll();
    }

    @Override
    public boolean existsByRfc(String rfc){
        return trabajadorRepository.existsByRfc(rfc);
    }

    // !TODO: fix trabajador repository
//    @Override
//    public boolean isBoss(int id) {
//        return trabajadorRepository.findById(id) != null && trabajadorRepository.findById(id).isJefe();
//    }


    @Override
    public Trabajador findById(int id) {
        return trabajadorRepository.findById(id);
    }

    @Override
    public void deleteTrabajador(int id) {
        // Implement logic to delete a Trabajador by ID
        // Example:
        Trabajador existingTrabajador = trabajadorRepository.findById(id);
        if (existingTrabajador != null) {
            trabajadorRepository.delete(existingTrabajador);
        }
    }

}
