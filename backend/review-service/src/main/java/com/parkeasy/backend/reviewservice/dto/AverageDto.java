package com.parkeasy.backend.reviewservice.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AverageDto {
    private double average;
    private long count;
}

