import React from 'react';

const SpotFilter = ({
  titleInput,
  setTitleInput,
  cityInput,
  setCityInput,
  radiusFilter,
  setRadiusFilter,
  handleSearch
}) => {
  return (
    <div className="bg-white shadow p-4 rounded mb-6 max-w-4xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-4">
      
      {/* Title Search */}
      <input
        type="text"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        placeholder="Search by Park Title"
        className="border border-gray-300 p-2 rounded w-full"
      />

      {/* City Search */}
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Search by City"
        className="border border-gray-300 p-2 rounded w-full"
      />

      {/* Radius Filter */}
      <select
        value={radiusFilter}
        onChange={(e) => setRadiusFilter(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full"
      >
        <option value="">Radius (optional)</option>
        <option value="500">500 meters</option>
        <option value="1000">1 km</option>
        <option value="2000">2 km</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Search
      </button>
    </div>
  );
};

export default SpotFilter;
