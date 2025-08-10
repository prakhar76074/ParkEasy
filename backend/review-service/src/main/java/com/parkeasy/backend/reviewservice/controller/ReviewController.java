package com.parkeasy.backend.reviewservice.controller;

import com.parkeasy.backend.reviewservice.dto.AverageDto;
import com.parkeasy.backend.reviewservice.dto.ReviewRequestDto;
import com.parkeasy.backend.reviewservice.dto.ReviewResponseDto;
import com.parkeasy.backend.reviewservice.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "${cors.allowedOrigins:http://localhost:3000}") // allow env override
public class ReviewController {

    private final ReviewService service;
    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDto> create(@Valid @RequestBody ReviewRequestDto req) {
        return ResponseEntity.ok(service.createReview(req));
    }

    @GetMapping("/spot/{spotId}")
    public ResponseEntity<List<ReviewResponseDto>> getBySpot(@PathVariable UUID spotId) {
        return ResponseEntity.ok(service.getBySpot(spotId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponseDto>> getByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }

    @GetMapping("/spot/{spotId}/average")
    public ResponseEntity<AverageDto> getAverage(@PathVariable UUID spotId) {
        return ResponseEntity.ok(service.getAverage(spotId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDto> update(@PathVariable UUID id, @Valid @RequestBody ReviewRequestDto req) {
        return ResponseEntity.ok(service.updateReview(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
