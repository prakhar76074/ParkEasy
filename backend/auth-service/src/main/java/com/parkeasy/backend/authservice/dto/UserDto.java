package com.parkeasy.backend.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class UserDto {
    private String username;
    private String email;
    private UUID id;
}
