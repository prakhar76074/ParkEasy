import React, { useEffect, useState } from "react";
import { getSpots } from "../services/SpotService";
import Navbar from "../components/Navbar";
import SpotFilter from "../components/SpotFilter";
import SpotGrid from "../components/SpotGrid";
import { haversineDistance } from "../utils/distanceUtils";
import { useSearchParams } from "react-router-dom";

const SpotListPage = () => {
  const [allSpots, setAllSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const titleInput = searchParams.get("title") || "";
  const cityInput = searchParams.get("city") || "";
  const radiusFilter = searchParams.get("radius") || "";

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await getSpots();
        setAllSpots(res.data);
        setFilteredSpots(res.data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      }
    };
    fetchSpots();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
      }
    );
  }, []);

  const handleSearch = (filters) => {
    setSearchParams(filters); // updates URL
    const { title, city, radius } = filters;

    const filtered = allSpots.filter((spot) => {
      const matchesTitle =
        !title || spot.title.toLowerCase().includes(title.toLowerCase());
      const matchesCity =
        !city || spot.city.toLowerCase().includes(city.toLowerCase());

      let withinRadius = true;
      if (userLocation && radius && spot.latitude && spot.longitude) {
        const dist = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          spot.latitude,
          spot.longitude
        );
        withinRadius = dist <= parseInt(radius);
      }

      return matchesTitle && matchesCity && withinRadius;
    });

    setFilteredSpots(filtered);
  };

  const generateMapLink = (spot) => {
    const fullAddress = `${spot.address}, ${spot.city}, ${spot.state}, ${spot.pincode}, ${spot.country}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  };

  return (
    <div>
      <Navbar />
      <section className="py-8 px-4 md:px-10 lg:px-20 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Available Parking Spots
        </h2>

        <SpotFilter
          titleInput={titleInput}
          cityInput={cityInput}
          radiusFilter={radiusFilter}
          onSearch={handleSearch}
        />

        <SpotGrid spots={filteredSpots} generateMapLink={generateMapLink} />
      </section>
    </div>
  );
};

export default SpotListPage;
