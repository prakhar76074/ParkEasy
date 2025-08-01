package com.parkeasy.backend.spotservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

// Spot.java
@Entity
@Data
@Table(name = "spots")
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String title;
    private String description;
    private Double latitude;
    private Double longitude;
    private Double pricePerHour;
    private Boolean available;

    // Getters and setters
}
