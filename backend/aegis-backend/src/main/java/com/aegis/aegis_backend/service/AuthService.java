package com.aegis.aegis_backend.service;

import com.aegis.aegis_backend.dto.AuthResponse;
import com.aegis.aegis_backend.dto.LoginRequest;
import com.aegis.aegis_backend.dto.RegisterRequest;
import com.aegis.aegis_backend.entity.Role;
import com.aegis.aegis_backend.entity.User;
import com.aegis.aegis_backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return new AuthResponse(null, "Email is required");
        }

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return new AuthResponse(null, "Password is required");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse(null, "Email already exists");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() == null ? Role.USER : request.getRole());

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(token, "User Registered Successfully");
    }

    public AuthResponse login(LoginRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return new AuthResponse(null, "Email is required");
        }

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return new AuthResponse(null, "Password is required");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new AuthResponse(null, "User not found");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(null, "Invalid password");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(token, "Login Successful");
    }
}