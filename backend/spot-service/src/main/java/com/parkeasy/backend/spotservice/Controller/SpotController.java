package com.parkeasy.backend.spotservice.Controller;

import com.parkeasy.backend.spotservice.dto.SpotRequestDto;
import com.parkeasy.backend.spotservice.dto.SpotResponseDto;
import com.parkeasy.backend.spotservice.model.Spot;
import com.parkeasy.backend.spotservice.repository.SpotRepository;
import com.parkeasy.backend.spotservice.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

// SpotController.java

@RestController
@RequestMapping("/api/spots")
@CrossOrigin(origins = "http://localhost:3000")
public class SpotController {

    @Autowired
    private SpotService spotService;

    @PostMapping
    public SpotResponseDto create(@RequestBody SpotRequestDto dto) {
        return spotService.createSpot(dto);
    }

    @GetMapping
    public List<SpotResponseDto> getAll() {
        return spotService.getAll();
    }

    @GetMapping("/available")
    public List<SpotResponseDto> getAvailable() {
        return spotService.getAvailable();
    }


    @GetMapping("/{id}")
    public SpotResponseDto getById(@PathVariable UUID id) {
        return spotService.getById(id);
    }

    @GetMapping("/host/{hostId}")
    public List<SpotResponseDto> getByHost(@PathVariable UUID hostId) {
        return spotService.getByHost(hostId);
    }

    @PutMapping("/{id}")
    public SpotResponseDto update(@PathVariable UUID id, @RequestBody SpotRequestDto dto) {
        return spotService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        spotService.delete(id);
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<SpotResponseDto>> getNearbySpots(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam(defaultValue = "1000") int radius
    ) {
        List<SpotResponseDto> nearbySpots = spotService.findNearbySpots(lat, lon, radius);
        return ResponseEntity.ok(nearbySpots);
    }



}