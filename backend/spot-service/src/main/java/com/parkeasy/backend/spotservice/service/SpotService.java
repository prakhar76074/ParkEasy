package com.parkeasy.backend.spotservice.service;



import com.parkeasy.backend.spotservice.model.Spot;
import com.parkeasy.backend.spotservice.repository.SpotRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpotService {

    private final SpotRepository spotRepository;

    public SpotService(SpotRepository spotRepository) {
        this.spotRepository = spotRepository;
    }

    public Spot createSpot(Spot spot) {
        return spotRepository.save(spot);
    }

    public List<Spot> getAvailableSpots() {
        return spotRepository.findByAvailableTrue();
    }
}

