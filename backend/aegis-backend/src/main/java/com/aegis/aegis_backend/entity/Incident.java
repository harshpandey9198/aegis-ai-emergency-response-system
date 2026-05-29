package com.aegis.aegis_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "incidents")
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String location;

    private String emergencyType;

    private String severity;

    private String status;

    private Long assignedTeamId;

    private Double latitude;

    private Double longitude;

    public Incident() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public String getEmergencyType() {
        return emergencyType;
    }

    public String getSeverity() {
        return severity;
    }

    public String getStatus() {
        return status;
    }

    public Long getAssignedTeamId() {
        return assignedTeamId;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setEmergencyType(String emergencyType) {
        this.emergencyType = emergencyType;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setAssignedTeamId(Long assignedTeamId) {
        this.assignedTeamId = assignedTeamId;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}