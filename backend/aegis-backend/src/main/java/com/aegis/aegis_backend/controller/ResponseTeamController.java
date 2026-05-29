package com.aegis.aegis_backend.controller;

import com.aegis.aegis_backend.entity.ResponseTeam;
import com.aegis.aegis_backend.service.ResponseTeamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@CrossOrigin("*")
public class ResponseTeamController {

    private final ResponseTeamService responseTeamService;

    public ResponseTeamController(ResponseTeamService responseTeamService) {
        this.responseTeamService = responseTeamService;
    }

    @PostMapping
    public ResponseTeam createTeam(@RequestBody ResponseTeam responseTeam) {
        return responseTeamService.createTeam(responseTeam);
    }

    @GetMapping
    public List<ResponseTeam> getAllTeams() {
        return responseTeamService.getAllTeams();
    }

    @GetMapping("/{id}")
    public ResponseTeam getTeamById(@PathVariable Long id) {
        return responseTeamService.getTeamById(id);
    }

    @PutMapping("/{id}")
    public ResponseTeam updateTeam(@PathVariable Long id, @RequestBody ResponseTeam responseTeam) {
        return responseTeamService.updateTeam(id, responseTeam);
    }

    @PutMapping("/{id}/status")
    public ResponseTeam updateStatus(@PathVariable Long id, @RequestParam String status) {
        return responseTeamService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public String deleteTeam(@PathVariable Long id) {
        responseTeamService.deleteTeam(id);
        return "Response team deleted successfully";
    }
}