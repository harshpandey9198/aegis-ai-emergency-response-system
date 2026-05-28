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

        return responseTeamRepository.save(responseTeam);
    }

    public List<ResponseTeam> getAllTeams() {

        return responseTeamRepository.findAll();
    }
}