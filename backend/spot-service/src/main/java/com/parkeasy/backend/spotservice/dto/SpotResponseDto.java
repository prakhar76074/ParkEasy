package com.parkeasy.backend.spotservice.dto;



import lombok.Data;
import java.util.UUID;

@Data
public class SpotResponseDto {
    private UUID id;
    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String country;
    private Double pricePerHour;
    private Boolean available;
    private UUID hostId;
    private Double latitude;
    private Double longitude;
    private String imageUrl1;
    private String imageUrl2;
}

