package com.aegis.aegis_backend.service;

import com.aegis.aegis_backend.entity.Incident;
import com.aegis.aegis_backend.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public Incident createIncident(Incident incident) {

        String description = incident.getDescription() == null
                ? ""
                : incident.getDescription().toLowerCase();

        if (description.contains("fire") || description.contains("smoke")) {
            incident.setEmergencyType("FIRE");
            incident.setSeverity("HIGH");
        } else if (description.contains("accident") || description.contains("crash")) {
            incident.setEmergencyType("ACCIDENT");
            incident.setSeverity("MEDIUM");
        } else if (description.contains("flood") || description.contains("water")) {
            incident.setEmergencyType("FLOOD");
            incident.setSeverity("HIGH");
        } else if (description.contains("medical") || description.contains("heart")) {
            incident.setEmergencyType("MEDICAL");
            incident.setSeverity("CRITICAL");
        } else if (description.contains("crime") || description.contains("theft") || description.contains("robbery")) {
            incident.setEmergencyType("CRIME");
            incident.setSeverity("HIGH");
        } else {
            incident.setEmergencyType("UNKNOWN");
            incident.setSeverity("LOW");
        }

        incident.setStatus("PENDING");

        return incidentRepository.save(incident);
    }

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));
    }

    public Incident updateStatus(Long id, String status) {

        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        incident.setStatus(status);

        return incidentRepository.save(incident);
    }

    public Incident assignTeam(Long incidentId, Long teamId) {

        Incident incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        incident.setAssignedTeamId(teamId);
        incident.setStatus("DISPATCHED");

        return incidentRepository.save(incident);
    }

    public void deleteIncident(Long id) {

        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        incidentRepository.delete(incident);
    }
}