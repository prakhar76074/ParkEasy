package com.parkeasy.backend.authservice.service;

import com.parkeasy.backend.authservice.dto.AuthResponse;
import com.parkeasy.backend.authservice.dto.LoginRequest;
import com.parkeasy.backend.authservice.dto.RegisterRequest;
import com.parkeasy.backend.authservice.dto.UserDto;
import com.parkeasy.backend.authservice.model.Role;
import com.parkeasy.backend.authservice.model.User;
import com.parkeasy.backend.authservice.repository.UserRepository;
import com.parkeasy.backend.authservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;




import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest req) {
        Set<Role> roles = req.getRoles().stream()
                .map(Role::valueOf)
                .collect(Collectors.toSet());

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .roles(roles)
                .build();

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(),
                roles.stream().map(Enum::name).collect(Collectors.toSet()));
        User user2 = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
      return new AuthResponse(token, Map.of(
               "id", user2.getId(),
                "name", user2.getName(),
                "email", user2.getEmail(),
                "roles", user2.getRolesAsStrings()
        ));
    }

    public AuthResponse login(LoginRequest request) {
        // Trigger Spring Security's authentication
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }



        String token = jwtUtil.generateToken(user.getEmail(), user.getRolesAsStrings());

        return new AuthResponse(token, Map.of(
                 "id" , user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "roles", user.getRolesAsStrings()
        ));
   }

    public UserDto getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDto(user.getName(), user.getEmail(),user.getId());
    }
}
