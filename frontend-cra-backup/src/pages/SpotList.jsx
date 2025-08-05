import React, { useEffect, useState } from 'react';
import { getSpots } from '../services/SpotService';
import Navbar from '../components/Navbar';
import SpotFilter from '../components/SpotFilter';
import { Link } from 'react-router-dom';

const SpotList = () => {
  const [allSpots, setAllSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);

  // Search filters
  const [titleInput, setTitleInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [radiusFilter, setRadiusFilter] = useState('');

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await getSpots();
        setAllSpots(res.data);
        setFilteredSpots(res.data);
      } catch (error) {
        console.error('Error fetching spots:', error);
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
        console.warn('Geolocation error:', err.message);
      }
    );
  }, []);

  const toRad = (value) => (value * Math.PI) / 180;

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // meters
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSearch = () => {
    const title = titleInput.toLowerCase().trim();
    const city = cityInput.toLowerCase().trim();
    const radius = parseInt(radiusFilter);

    const filtered = allSpots.filter((spot) => {
      
      const matchesTitle =
        title === '' || spot.title.toLowerCase().includes(title);
      const matchesCity =
        city === '' || spot.city.toLowerCase().includes(city);

      let withinRadius = true;
      if (
        userLocation &&
        radius &&
        spot.latitude &&
        spot.longitude
      ) {
        const dist = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          spot.latitude,
          spot.longitude
        );
        withinRadius = dist <= radius;
      }

      return matchesTitle && matchesCity && withinRadius;
    });

    setFilteredSpots(filtered);
  };

  const generateMapLink = (spot) => {
    const fullAddress = `${spot.address}, ${spot.city}, ${spot.state}, ${spot.pincode}, ${spot.country}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddress
    )}`;
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
          setTitleInput={setTitleInput}
          cityInput={cityInput}
          setCityInput={setCityInput}
          radiusFilter={radiusFilter}
          setRadiusFilter={setRadiusFilter}
          handleSearch={handleSearch}
        />

        {filteredSpots.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No matching spots found.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
              >
                {spot.imageUrl1 && (
                  <img
                    src={spot.imageUrl1}
                    alt="Spot"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-800">
                    {spot.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {spot.description}
                  </p>
                
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">Address:</span>{' '}
                    {`${spot.address}, ${spot.city}, ${spot.state} - ${spot.pincode}, ${spot.country}`}
                  </div>
                  <p className={spot.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                 {spot.available ? "Available" : "Not Available now"}
</p>

                  <div className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">Price:</span> ₹
                    {spot.pricePerHour}/hr
                  </div>
                </div>

                <div className="bg-blue-50 p-3 flex justify-between items-center">
                  <a
                    href={generateMapLink(spot)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline hover:text-blue-800"
                  >
                    View on Map
                  </a>
                  
                  <Link to={`/spot/${spot.id}`}>
                    <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SpotList;
