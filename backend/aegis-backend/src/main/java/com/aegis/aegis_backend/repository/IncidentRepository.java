package com.aegis.aegis_backend.repository;

import com.aegis.aegis_backend.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    long countByStatus(String status);

    long countBySeverity(String severity);

    long countByEmergencyType(String emergencyType);
}