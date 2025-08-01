package com.parkeasy.backend.spotservice.Controller;

import com.parkeasy.backend.spotservice.model.Spot;
import com.parkeasy.backend.spotservice.repository.SpotRepository;
import com.parkeasy.backend.spotservice.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// SpotController.java

@RestController
@RequestMapping("/api/spots")
@CrossOrigin(origins = "http://localhost:3000")
public class SpotController {

    private final SpotService spotService;

    public SpotController(SpotService spotService) {
        this.spotService = spotService;
    }

    @PostMapping
    public Spot createSpot(@RequestBody Spot spot) {
        return spotService.createSpot(spot);
    }

    @GetMapping
    public List<Spot> getAvailableSpots() {
        return spotService.getAvailableSpots();
    }
}