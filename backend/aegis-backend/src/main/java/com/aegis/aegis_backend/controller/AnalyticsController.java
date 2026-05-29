package com.aegis.aegis_backend.controller;

import com.aegis.aegis_backend.repository.IncidentRepository;
import com.aegis.aegis_backend.repository.ResponseTeamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    private final IncidentRepository incidentRepository;
    private final ResponseTeamRepository responseTeamRepository;

    public AnalyticsController(
            IncidentRepository incidentRepository,
            ResponseTeamRepository responseTeamRepository) {
        this.incidentRepository = incidentRepository;
        this.responseTeamRepository = responseTeamRepository;
    }

    @GetMapping("/summary")
    public Map<String, Long> getSummary() {

        Map<String, Long> data = new HashMap<>();

        data.put("totalIncidents", incidentRepository.count());
        data.put("pendingIncidents", incidentRepository.countByStatus("PENDING"));
        data.put("resolvedIncidents", incidentRepository.countByStatus("RESOLVED"));
        data.put("dispatchedIncidents", incidentRepository.countByStatus("DISPATCHED"));

        data.put("highSeverity", incidentRepository.countBySeverity("HIGH"));
        data.put("criticalSeverity", incidentRepository.countBySeverity("CRITICAL"));

        data.put("fireIncidents", incidentRepository.countByEmergencyType("FIRE"));
        data.put("accidentIncidents", incidentRepository.countByEmergencyType("ACCIDENT"));
        data.put("floodIncidents", incidentRepository.countByEmergencyType("FLOOD"));
        data.put("medicalIncidents", incidentRepository.countByEmergencyType("MEDICAL"));

        data.put("totalTeams", responseTeamRepository.count());
        data.put("availableTeams", responseTeamRepository.countByStatus("AVAILABLE"));
        data.put("busyTeams", responseTeamRepository.countByStatus("BUSY"));

        return data;
    }
}