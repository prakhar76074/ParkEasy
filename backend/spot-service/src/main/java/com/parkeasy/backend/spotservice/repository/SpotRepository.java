package com.parkeasy.backend.spotservice.repository;

import com.parkeasy.backend.spotservice.model.Spot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SpotRepository extends JpaRepository<Spot, UUID> {
    List<Spot> findByAvailableTrue();
}
