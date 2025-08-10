package com.parkeasy.backend.bookingservice.service;

import com.parkeasy.backend.bookingservice.dto.BookingRequestDto;
import com.parkeasy.backend.bookingservice.dto.BookingResponseDto;
import com.parkeasy.backend.bookingservice.dto.SpotDto;
import com.parkeasy.backend.bookingservice.dto.UserDto;
import com.parkeasy.backend.bookingservice.model.Booking;
import com.parkeasy.backend.bookingservice.model.BookingStatus;
import com.parkeasy.backend.bookingservice.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class BookingService {

    @Autowired private BookingRepository repo;
    @Autowired private SpotClient spotClient;

    @Autowired private UserClient userClient;

    private final WebClient webClient;
    private final WebClient webClient2;




    public BookingService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8081/api/spots").build();
        this.webClient2 = webClientBuilder.baseUrl("http://localhost:8081/api/auth/{id}").build();
    }






    public ResponseEntity<BookingResponseDto> createBooking(BookingRequestDto req) {
        // 1. Fetch spot details from spot-service
        SpotDto spot = webClient.get()
                .uri("http://localhost:8081/api/spots/" + req.getSpotId())
                .retrieve()
                .bodyToMono(SpotDto.class)
                .block();

        // 2. Get hostId from spot response
        UUID hostId = spot.getHostId();
        Booking booking = new Booking();
        booking.setSpotId(req.getSpotId());
        booking.setHostId(hostId);
        booking.setUserId(req.getUserId());

        booking.setStartTime(req.getStartTime());
        booking.setEndTime(req.getEndTime());
        booking.setStatus(BookingStatus.PENDING);
        repo.save(booking);

        System.out.println("Booking created"+toDto(booking));
        return ResponseEntity.ok(toDto(booking));
    }

    public List<BookingResponseDto> getBookingsForHost(UUID hostId, String status) {
        List<Booking> all = repo.findAll();
        System.out.println("all booking"+all);

        return all.stream()
                .filter(b -> {
                    SpotDto spot = spotClient.getSpotById(b.getSpotId());
                    System.out.println("spot "+spot);
                    boolean hostMatch = spot.getHostId().equals(hostId);
                    boolean statusMatch = (status == null || status.isEmpty()) || b.getStatus().equals(status);
                    return hostMatch && statusMatch;
                })

                .map(this::toDto)
                .toList();

    }



    public void updateStatus(UUID bookingId, BookingStatus status) {
        Booking booking = repo.findById(bookingId).orElseThrow();
        booking.setStatus(status);
        repo.save(booking);
    }
    public List<BookingResponseDto> getBookingsForUser(UUID userId) {
        List<Booking> bookings = repo.findByUserId(userId); // Use repo method
        System.out.println("Bookings "+bookings);
        return bookings.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }


    private BookingResponseDto toDto(Booking booking) {
        SpotDto spot = spotClient.getSpotById(booking.getSpotId());
        UserDto user = userClient.getUserById(booking.getUserId());
        return BookingResponseDto.builder()
                .id(booking.getId())
                .spotId(booking.getSpotId())
                .userId(booking.getUserId())
                .username(user.getUsername()) // new field
                .status(booking.getStatus())
                .spotTitle(spot.getTitle())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .build();
    }

//    private BookingResponseDto toDtoWithUsername(Booking booking) {
//        // Fetch username from user-service
//        String username = webClient.get()
//                .uri("http://localhost:8081/api/user/" + booking.getUserId())
//                .retrieve()
//                .bodyToMono(UserDto.class)
//                .block()
//                .getUsername();
//
//        return BookingResponseDto.builder()
//                .id(booking.getId())
//                .spotId(booking.getSpotId())
//                .userId(booking.getUserId())
//                .username(username) // new field
//                .status(booking.getStatus())
//                .startTime(booking.getStartTime())
//                .endTime(booking.getEndTime())
//                .build();
//    }
}

