package com.aegis.aegis_backend.service;

import org.springframework.stereotype.Service;

@Service
public class AiChatService {

    public String generateReply(String message) {

        if (message == null || message.trim().isEmpty()) {
            return "Please describe the emergency clearly.";
        }

        String text = message.toLowerCase();

        if (text.contains("fire") || text.contains("smoke")) {
            return "Fire emergency detected. Move away from smoke, avoid lifts, call fire services, and evacuate through emergency exits.";
        }

        if (text.contains("accident") || text.contains("crash")) {
            return "Accident detected. Check injuries, avoid moving severely injured people, call ambulance, and keep the area safe.";
        }

        if (text.contains("flood") || text.contains("water")) {
            return "Flood risk detected. Move to higher ground, avoid electric poles, do not walk through fast-moving water, and wait for rescue.";
        }

        if (text.contains("heart") || text.contains("medical") || text.contains("breathing")) {
            return "Medical emergency detected. Call ambulance immediately, keep the patient calm, check breathing, and start CPR only if trained.";
        }

        if (text.contains("crime") || text.contains("theft") || text.contains("robbery")) {
            return "Crime emergency detected. Move to a safe place, avoid direct confrontation, call police, and share location details.";
        }

        return "I understand. Please share emergency type, location, severity, and whether anyone is injured so the system can guide better.";
    }
}