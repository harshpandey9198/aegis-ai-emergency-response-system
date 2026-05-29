package com.aegis.aegis_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class AiChatService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    private final RestClient restClient;

    public AiChatService() {
        this.restClient = RestClient.builder().build();
    }

    public String generateReply(String message) {

        if (message == null || message.trim().isEmpty()) {
            return "Please describe the emergency clearly.";
        }

        try {
            String prompt =
                    "You are AEGIS AI, an emergency response assistant. " +
                    "Give short, practical and safety-focused guidance. " +
                    "Do not panic the user. Use simple language. " +
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
                return "AI could not generate a response. Please try again.";
            }

            Map firstCandidate = (Map) candidates.get(0);
            Map content = (Map) firstCandidate.get("content");
            List parts = (List) content.get("parts");
            Map firstPart = (Map) parts.get(0);

            return firstPart.get("text").toString();

        } catch (Exception e) {
            return "AI service is currently unavailable. Please contact emergency services immediately if this is urgent.";
        }
    }
}