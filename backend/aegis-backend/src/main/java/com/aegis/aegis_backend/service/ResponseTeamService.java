package com.aegis.aegis_backend.service;

import com.aegis.aegis_backend.entity.ResponseTeam;
import com.aegis.aegis_backend.repository.ResponseTeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseTeamService {

    private final ResponseTeamRepository responseTeamRepository;

    public ResponseTeamService(ResponseTeamRepository responseTeamRepository) {
        this.responseTeamRepository = responseTeamRepository;
    }

    public ResponseTeam createTeam(ResponseTeam responseTeam) {
        if (responseTeam.getStatus() == null || responseTeam.getStatus().isEmpty()) {
            responseTeam.setStatus("AVAILABLE");
        }

        return responseTeamRepository.save(responseTeam);
    }

    public List<ResponseTeam> getAllTeams() {
        return responseTeamRepository.findAll();
    }

    public ResponseTeam getTeamById(Long id) {
        return responseTeamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Response team not found"));
    }

    public ResponseTeam updateTeam(Long id, ResponseTeam updatedTeam) {
        ResponseTeam team = responseTeamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Response team not found"));

        team.setTeamName(updatedTeam.getTeamName());
        team.setLeaderName(updatedTeam.getLeaderName());
        team.setContactNumber(updatedTeam.getContactNumber());
        team.setSpecialization(updatedTeam.getSpecialization());
        team.setStatus(updatedTeam.getStatus());
        team.setCurrentLocation(updatedTeam.getCurrentLocation());

        return responseTeamRepository.save(team);
    }

    public ResponseTeam updateStatus(Long id, String status) {
        ResponseTeam team = responseTeamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Response team not found"));

        team.setStatus(status);

        return responseTeamRepository.save(team);
    }

    public void deleteTeam(Long id) {
        ResponseTeam team = responseTeamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Response team not found"));

        responseTeamRepository.delete(team);
    }
}