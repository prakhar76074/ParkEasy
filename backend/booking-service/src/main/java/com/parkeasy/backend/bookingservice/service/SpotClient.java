package com.parkeasy.backend.bookingservice.service;

import com.parkeasy.backend.bookingservice.dto.SpotDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Service
public class SpotClient {

    private final WebClient webClient;

    public SpotClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://localhost:8081/api/spots").build();
    }

    public SpotDto getSpotById(UUID spotId) {
        return webClient.get()
                .uri("/{id}", spotId)
                .retrieve()
                .bodyToMono(SpotDto.class)
                .block(); // you can use block() if your service is not reactive
    }
}
