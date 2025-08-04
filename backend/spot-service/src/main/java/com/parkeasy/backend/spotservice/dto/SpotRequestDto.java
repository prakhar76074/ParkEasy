package com.parkeasy.backend.spotservice.dto;



import lombok.Data;

import java.util.UUID;

@Data
public class SpotRequestDto {
    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String country;
    private Double pricePerHour;
    private String imageUrl1;
    private String imageUrl2;
    private UUID hostId; // NEW — must be passed for now
}

