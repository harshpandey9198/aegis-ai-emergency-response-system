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

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

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

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid Email"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid Password");
    }

    String token = jwtService.generateToken(user);

    return new AuthResponse(token, "Login Successful");
}
}