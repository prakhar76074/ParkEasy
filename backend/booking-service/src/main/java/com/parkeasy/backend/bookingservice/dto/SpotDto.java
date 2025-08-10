package com.parkeasy.backend.bookingservice.dto;


import lombok.Data;

import java.util.UUID;

@Data
public class SpotDto {
    private String id;
    private String title;
    private String address;
    private String city;
    private Double pricePerHour;
    private Boolean available;
    private UUID hostId;

    // Add other necessary fields

    // Getters and Setters
}

