package com.parkeasy.backend.reviewservice.repository;


import com.parkeasy.backend.reviewservice.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findBySpotIdOrderByCreatedAtDesc(UUID spotId);
    List<Review> findByUserIdOrderByCreatedAtDesc(UUID userId);
    long countBySpotId(UUID spotId);
}
