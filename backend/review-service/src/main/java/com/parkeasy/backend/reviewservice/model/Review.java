package com.parkeasy.backend.reviewservice.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    @Id
    @GeneratedValue
    private UUID id;

    private UUID spotId;     // spot reference (only id)
    private UUID userId;     // who left the review

    @Column(nullable = false)
    private Integer rating;  // 1..5

    @Column(columnDefinition = "TEXT")
    private String comment;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
