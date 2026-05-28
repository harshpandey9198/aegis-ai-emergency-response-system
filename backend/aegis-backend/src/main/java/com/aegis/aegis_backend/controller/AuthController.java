package com.aegis.aegis_backend.controller;

import com.aegis.aegis_backend.dto.AuthResponse;
import com.aegis.aegis_backend.dto.LoginRequest;
import com.aegis.aegis_backend.dto.RegisterRequest;
import com.aegis.aegis_backend.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}