package com.parkeasy.backend.bookingservice.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BookingRequestDto {
    private UUID spotId;
    private UUID userId;
    private String username;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}

