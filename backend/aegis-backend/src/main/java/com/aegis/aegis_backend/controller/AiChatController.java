package com.aegis.aegis_backend.controller;

import com.aegis.aegis_backend.dto.ChatRequest;
import com.aegis.aegis_backend.dto.ChatResponse;
import com.aegis.aegis_backend.service.AiChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiChatController {

    private final AiChatService aiChatService;

    public AiChatController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String reply = aiChatService.generateReply(request.getMessage());
        return new ChatResponse(reply);
    }
}