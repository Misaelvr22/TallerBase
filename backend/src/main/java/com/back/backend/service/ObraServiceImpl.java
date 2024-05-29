package com.back.backend.service;

import com.back.backend.model.Obra;
import com.back.backend.repository.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ObraServiceImpl implements ObraService{
    @Autowired
    private ObraRepository obraRepository;

    @Override
    public Obra saveObra(Obra obra) {
        return obraRepository.save(obra);
    }

    @Override
    public List<Obra> getAllObras() {
        return obraRepository.findAll();
    }

    @Override
    public boolean existsByidObra(String idObra) {
        return obraRepository.existsById(idObra);
    }

    @Override
    public Obra findByIdObra(String idObra) {
        return obraRepository.findById(idObra).get();
    }

    @Override
    public void deleteObra(String idObra) {
        Obra existingObra = obraRepository.findById(idObra).get();
        if(existingObra != null) {
            obraRepository.delete(existingObra);
        }

    }


}
