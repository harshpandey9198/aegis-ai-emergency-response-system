package com.aegis.aegis_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AiChatService {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.api.url:}")
    private String geminiApiUrl;

    private final RestClient restClient;

    public AiChatService() {
        this.restClient = RestClient.builder().build();
    }

    public String generateReply(String message) {

        if (message == null || message.trim().isEmpty()) {
            return "Please describe the emergency clearly.";
        }

        if (geminiApiKey == null || geminiApiKey.isBlank() || geminiApiUrl == null || geminiApiUrl.isBlank()) {
            return getOfflineEmergencyGuidance(message);
        }

        try {
            String prompt =
                    "You are AEGIS AI, an emergency response assistant. " +
                    "Give short, practical and safety-focused guidance. " +
                    "Use simple language. " +
                    "Emergency details: " + message;

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", prompt)
                                    )
                            )
                    )
            );

            Map response = restClient.post()
                    .uri(geminiApiUrl)
                    .header("x-goog-api-key", geminiApiKey)
                    .header("Content-Type", "application/json")
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            List candidates = (List) response.get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                return getOfflineEmergencyGuidance(message);
            }

            Map firstCandidate = (Map) candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List parts = (List) content.get("parts");

            if (parts == null || parts.isEmpty()) {
                return getOfflineEmergencyGuidance(message);
            }

            Map firstPart = (Map) parts.get(0);
            Object text = firstPart.get("text");

            if (text == null) {
                return getOfflineEmergencyGuidance(message);
            }

            return text.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return getOfflineEmergencyGuidance(message);
        }
    }

    private String getOfflineEmergencyGuidance(String message) {

        String lower = message.toLowerCase();

        if (lower.contains("fire") || lower.contains("smoke")) {
            return "Fire emergency detected. Leave the building immediately, avoid elevators, cover your nose and mouth if there is smoke, call fire services, and move to a safe open area.";
        }

        if (lower.contains("accident") || lower.contains("crash")) {
            return "Accident emergency detected. Move to a safe place, call emergency services, do not move seriously injured people unless there is immediate danger, and wait for medical help.";
        }

        if (lower.contains("medical") || lower.contains("heart") || lower.contains("unconscious")) {
            return "Medical emergency detected. Call an ambulance immediately, keep the person calm, check breathing, and do not give food or water unless advised by medical professionals.";
        }

        if (lower.contains("flood") || lower.contains("water")) {
            return "Flood emergency detected. Move to higher ground, avoid walking or driving through flood water, switch off electricity if safe, and follow local emergency alerts.";
        }

        if (lower.contains("earthquake")) {
            return "Earthquake emergency detected. Drop, cover, and hold on. Stay away from windows, do not use elevators, and move to an open area after shaking stops.";
        }

        if (lower.contains("crime") || lower.contains("theft") || lower.contains("robbery")) {
            return "Crime emergency detected. Move to a safe location, avoid direct confrontation, call police immediately, and share your location with trusted contacts.";
        }

        return "Emergency guidance is available in offline mode. Stay calm, move to a safe location, contact emergency services immediately, and follow official safety instructions.";
    }
}