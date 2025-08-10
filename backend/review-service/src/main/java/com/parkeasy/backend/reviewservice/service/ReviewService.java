package com.parkeasy.backend.reviewservice.service;
import com.parkeasy.backend.reviewservice.dto.AverageDto;
import com.parkeasy.backend.reviewservice.dto.ReviewRequestDto;
import com.parkeasy.backend.reviewservice.dto.ReviewResponseDto;
import com.parkeasy.backend.reviewservice.dto.UserDto;
import com.parkeasy.backend.reviewservice.model.Review;
import com.parkeasy.backend.reviewservice.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository repo;

    @Autowired
    private UserClient userClient;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public ReviewResponseDto createReview(ReviewRequestDto req) {
        Review r = Review.builder()
                .spotId(req.getSpotId())
                .userId(req.getUserId())
                .rating(req.getRating())
                .comment(req.getComment())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Review saved = repo.save(r);
        return toDto(saved);
    }


    public List<ReviewResponseDto> getBySpot(UUID spotId) {
        return repo.findBySpotIdOrderByCreatedAtDesc(spotId).stream()
                .map(this::toDto).collect(Collectors.toList());
    }

    public List<ReviewResponseDto> getByUser(UUID userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto).collect(Collectors.toList());
    }

    public AverageDto getAverage(UUID spotId) {
        List<Review> list = repo.findBySpotIdOrderByCreatedAtDesc(spotId);
        long count = list.size();
        double avg = count == 0 ? 0.0 : list.stream().mapToInt(Review::getRating).average().orElse(0.0);
        return new AverageDto(avg, count);
    }

    public ReviewResponseDto updateReview(UUID id, ReviewRequestDto req) {
        Review r = repo.findById(id).orElseThrow(() -> new NoSuchElementException("Review not found"));
        r.setRating(req.getRating());
        r.setComment(req.getComment());
        r.setUpdatedAt(LocalDateTime.now());
        return toDto(repo.save(r));
    }


    public void deleteReview(UUID id) {
        repo.deleteById(id);
    }


    private ReviewResponseDto toDto(Review r) {
        UserDto user = userClient.getUserById(r.getUserId());
        return ReviewResponseDto.builder()
                .id(r.getId())
                .spotId(r.getSpotId())
                .userId(r.getUserId())
                .rating(r.getRating())
                .username(user.getUsername())
                .comment(r.getComment())
                .createdAt(r.getCreatedAt())
                .updatedAt(r.getUpdatedAt())
                .build();
    }
}
