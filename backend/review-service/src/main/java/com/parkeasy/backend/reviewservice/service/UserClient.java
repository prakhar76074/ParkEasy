package com.parkeasy.backend.reviewservice.service;



import com.parkeasy.backend.reviewservice.dto.UserDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;

@Service
public class UserClient {

    private final WebClient webClient;

    public UserClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("http://localhost:8082/api/auth").build();
    }

    public UserDto getUserById(UUID spotId) {
        return webClient.get()
                .uri("/{id}", spotId)
                .retrieve()
                .bodyToMono(UserDto.class)
                .block(); // you can use block() if your service is not reactive
    }
}

