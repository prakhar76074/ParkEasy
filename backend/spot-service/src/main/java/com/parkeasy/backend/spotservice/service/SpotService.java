package com.parkeasy.backend.spotservice.service;

import com.parkeasy.backend.spotservice.dto.SpotRequestDto;
import com.parkeasy.backend.spotservice.dto.SpotResponseDto;
import com.parkeasy.backend.spotservice.model.Spot;
import com.parkeasy.backend.spotservice.repository.SpotRepository;
import com.parkeasy.backend.spotservice.utils.GeoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SpotService {

    @Autowired
    private SpotRepository spotRepository;

    public SpotResponseDto createSpot(SpotRequestDto dto) {
        // Combine full address
        String fullAddress = String.format("%s, %s, %s - %s, %s",
                dto.getAddress(), dto.getCity(), dto.getState(), dto.getPincode(), dto.getCountry());

        // Call geocoding utility
        double[] latLng = GeoUtils.getLatLngFromAddress(fullAddress);

        Spot spot = Spot.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .address(dto.getAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .pincode(dto.getPincode())
                .country(dto.getCountry())
                .pricePerHour(dto.getPricePerHour())
                .hostId(dto.getHostId())
                .available(true)
                .latitude(latLng[0])
                .longitude(latLng[1])
                .imageUrl1(dto.getImageUrl1())
                .imageUrl2(dto.getImageUrl2())
                .build();

        Spot saved = spotRepository.save(spot);
        return toResponseDto(saved);
    }

    public List<SpotResponseDto> getAll() {
        return spotRepository.findAll().stream().map(this::toResponseDto).collect(Collectors.toList());
    }

    public SpotResponseDto getById(UUID id) {
        return spotRepository.findById(id).map(this::toResponseDto).orElse(null);
    }

    public List<SpotResponseDto> getAvailable() {
        return spotRepository.findByAvailableTrue().stream().map(this::toResponseDto).collect(Collectors.toList());
    }

    public List<SpotResponseDto> getByHost(UUID hostId) {
        List<SpotResponseDto> response = spotRepository.findByHostId(hostId).stream().map(this::toResponseDto).collect(Collectors.toList());
        System.out.println("responnse is : " + response);
        return response;
    }

    public SpotResponseDto update(UUID id, SpotRequestDto dto) {
        Spot spot = spotRepository.findById(id).orElseThrow();

        spot.setTitle(dto.getTitle());
        spot.setDescription(dto.getDescription());
        spot.setAddress(dto.getAddress());
        spot.setCity(dto.getCity());
        spot.setState(dto.getState());
        spot.setPincode(dto.getPincode());
        spot.setCountry(dto.getCountry());
        spot.setPricePerHour(dto.getPricePerHour());
        spot.setImageUrl1(dto.getImageUrl1());
        spot.setImageUrl2(dto.getImageUrl2());
        spot.setAvailable(dto.getAvailable());


        // Optionally update lat/lon again (if address changed)
        String updatedAddress = String.format("%s, %s, %s - %s, %s",
                dto.getAddress(), dto.getCity(), dto.getState(), dto.getPincode(), dto.getCountry());

        double[] latLng = GeoUtils.getLatLngFromAddress(updatedAddress);
        spot.setLatitude(latLng[0]);
        spot.setLongitude(latLng[1]);

        Spot updated = spotRepository.save(spot);
        return toResponseDto(updated);
    }

    public void delete(UUID id) {
        spotRepository.deleteById(id);
    }

    public List<SpotResponseDto> findNearbySpots(double lat, double lon, int radius) {
        List<Spot> allSpots = spotRepository.findAll();
        return allSpots.stream()
                .filter(spot -> {
                    if (spot.getLatitude() == null || spot.getLongitude() == null) return false;
                    double distance = GeoUtils.haversine(lat, lon, spot.getLatitude(), spot.getLongitude());
                    return distance <= radius;
                })
                .map(this::toResponseDto)
                .toList();
    }

    private SpotResponseDto toResponseDto(Spot spot) {
        SpotResponseDto dto = new SpotResponseDto();
        dto.setId(spot.getId());
        dto.setTitle(spot.getTitle());
        dto.setDescription(spot.getDescription());
        dto.setAddress(spot.getAddress());
        dto.setCity(spot.getCity());
        dto.setState(spot.getState());
        dto.setPincode(spot.getPincode());
        dto.setCountry(spot.getCountry());
        dto.setPricePerHour(spot.getPricePerHour());
        dto.setAvailable(spot.getAvailable());
        dto.setImageUrl1(spot.getImageUrl1());
        dto.setImageUrl2(spot.getImageUrl2());
        dto.setLatitude(spot.getLatitude());
        dto.setLongitude(spot.getLongitude());
        dto.setHostId(spot.getHostId());
        return dto;
    }
}
