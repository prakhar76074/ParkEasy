package com.parkeasy.backend.authservice.dto;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Set<String> roles; // ["HOST", "DRIVER"]
}