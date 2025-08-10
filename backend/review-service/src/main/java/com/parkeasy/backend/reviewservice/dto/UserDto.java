package com.parkeasy.backend.reviewservice.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String username;
    private String email; // optional, only if user-service returns it
}
