package com.parkeasy.backend.spotservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

// Spot.java
@Entity
@Data
@Table(name = "spots")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Spot {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(updatable = false, nullable = false)
    private UUID id;

    private String title;
    private String description;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String country;

    private Double latitude;
    private Double longitude;

    private Double pricePerHour;
    private Boolean available = true;

    private UUID hostId;
    @Lob
    @Column(name = "image_url1", columnDefinition = "TEXT")
    private String imageUrl1;

    @Lob
    @Column(name = "image_url2", columnDefinition = "TEXT")
    private String imageUrl2;

    // Add hostId (foreign key to User) if needed
}
