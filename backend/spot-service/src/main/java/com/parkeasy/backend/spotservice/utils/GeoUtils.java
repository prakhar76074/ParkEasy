package com.parkeasy.backend.spotservice.utils;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

public class GeoUtils {

    private static final String NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/search";

    public static double[] getLatLngFromAddress(String address) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_API_URL)
                    .queryParam("q", address)
                    .queryParam("format", "json")
                    .queryParam("limit", 1)
                    .toUriString();

            RestTemplate restTemplate = new RestTemplate();
            String jsonResponse = restTemplate.getForObject(url, String.class);

            JSONArray array = new JSONArray(jsonResponse);

            if (array.length() == 0) {
                System.out.println("No geocoding result found for address: " + address);
                return new double[]{0.0, 0.0};
            }

            JSONObject location = array.getJSONObject(0);
            double lat = Double.parseDouble(location.getString("lat"));
            double lon = Double.parseDouble(location.getString("lon"));

            return new double[]{lat, lon};
        } catch (Exception e) {
            System.out.println("Geocoding failed for address: " + address);
            e.printStackTrace();
            return new double[]{0.0, 0.0};
        }
    }

    public static double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of Earth in KM
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2)
                        + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in KM
    }
}
