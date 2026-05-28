package com.aegis.aegis_backend.service;

import com.aegis.aegis_backend.entity.User;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class JwtService {

    public String generateToken(User user) {

        String data = user.getEmail() + ":" + user.getRole();

        return Base64.getEncoder().encodeToString(data.getBytes());
    }
}