package com.aegis.aegis_backend.repository;

import com.aegis.aegis_backend.entity.ResponseTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseTeamRepository extends JpaRepository<ResponseTeam, Long> {

    long countByStatus(String status);
}