package com.parkeasy.backend.authservice.controller;


import com.parkeasy.backend.authservice.dto.AuthResponse;
import com.parkeasy.backend.authservice.dto.LoginRequest;
import com.parkeasy.backend.authservice.dto.RegisterRequest;
import com.parkeasy.backend.authservice.dto.UserDto;
import com.parkeasy.backend.authservice.model.User;
import com.parkeasy.backend.authservice.repository.UserRepository;
import com.parkeasy.backend.authservice.service.AuthService;
import com.parkeasy.backend.authservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable UUID id) {
        return authService.getUserById(id);
    }

}

