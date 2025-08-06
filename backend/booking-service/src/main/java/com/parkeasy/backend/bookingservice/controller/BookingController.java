package com.parkeasy.backend.bookingservice.controller;

import com.parkeasy.backend.bookingservice.dto.BookingRequestDto;
import com.parkeasy.backend.bookingservice.dto.BookingResponseDto;
import com.parkeasy.backend.bookingservice.model.Booking;
import com.parkeasy.backend.bookingservice.model.BookingStatus;
import com.parkeasy.backend.bookingservice.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDto> book(@RequestBody BookingRequestDto req) {
        ResponseEntity<BookingResponseDto> response= bookingService.createBooking(req);
        System.out.println("response: "+response);
        return response;
    }

    @GetMapping("/host/{hostId}")
    public List<BookingResponseDto> getBookingsForHost(
            @PathVariable UUID hostId,
            @RequestParam(required = false) String status) {
        return bookingService.getBookingsForHost(hostId, status);
    }
    @GetMapping("/user/{userId}")
    public List<BookingResponseDto> getBookingsForUser(@PathVariable UUID userId) {
        return bookingService.getBookingsForUser(userId);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approve(@PathVariable UUID id) {
        bookingService.updateStatus(id, BookingStatus.APPROVED);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Void> reject(@PathVariable UUID id) {
        bookingService.updateStatus(id, BookingStatus.REJECTED);
        return ResponseEntity.ok().build();
    }
}

