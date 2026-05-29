package com.aegis.aegis_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "response_teams")
public class ResponseTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teamName;
    private String leaderName;
    private String contactNumber;
    private String specialization;
    private String status;
    private String currentLocation;

    public ResponseTeam() {
    }

    public Long getId() {
        return id;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getStatus() {
        return status;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }
}