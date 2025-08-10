package com.parkeasy.backend.reviewservice.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDto {
    @NotNull
    private UUID spotId;

    @NotNull
    private UUID userId;

    @NotNull @Min(1) @Max(5)
    private Integer rating;

    private String comment;
}
