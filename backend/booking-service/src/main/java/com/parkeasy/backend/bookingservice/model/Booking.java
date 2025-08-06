package com.parkeasy.backend.bookingservice.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue
    private UUID id;


    private UUID spotId;

    private UUID userId;
    private LocalDate date;
    private String timeSlot; // e.g. "10AM - 12PM"
    private UUID hostId; //
    @Enumerated(EnumType.STRING)
    private BookingStatus status; // PENDING, APPROVED, REJECTED
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}

