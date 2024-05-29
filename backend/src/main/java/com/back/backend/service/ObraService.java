package com.back.backend.service;

import com.back.backend.model.Obra;

import java.util.List;

public interface ObraService {
    public Obra saveObra(Obra obra);
    public List<Obra> getAllObras();
    boolean existsByidObra(String idObra);
    public Obra findByIdObra(String idObra);

}