package com.aegis.aegis_backend.controller;

import com.aegis.aegis_backend.repository.IncidentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    private final IncidentRepository incidentRepository;

    public AnalyticsController(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    @GetMapping("/summary")
    public Map<String, Long> getSummary() {

        Map<String, Long> data = new HashMap<>();

        data.put("totalIncidents", incidentRepository.count());
        data.put("pendingIncidents", incidentRepository.countByStatus("PENDING"));
        data.put("resolvedIncidents", incidentRepository.countByStatus("RESOLVED"));
        data.put("highSeverity", incidentRepository.countBySeverity("HIGH"));
        data.put("criticalSeverity", incidentRepository.countBySeverity("CRITICAL"));
        data.put("fireIncidents", incidentRepository.countByEmergencyType("FIRE"));
        data.put("accidentIncidents", incidentRepository.countByEmergencyType("ACCIDENT"));
        data.put("floodIncidents", incidentRepository.countByEmergencyType("FLOOD"));
        data.put("medicalIncidents", incidentRepository.countByEmergencyType("MEDICAL"));

        return data;
    }
}