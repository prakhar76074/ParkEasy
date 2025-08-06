package com.parkeasy.backend.bookingservice.dto;

import com.parkeasy.backend.bookingservice.model.BookingStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BookingResponseDto {
    private UUID id;
    private UUID spotId;
    private String spotTitle;
    private UUID hostId;
    private UUID userId;
    private BookingStatus status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}

