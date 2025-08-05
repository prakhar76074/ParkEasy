// components/RadiusSelector.jsx
import React from 'react';

const RadiusSelector = ({ radius, setRadius }) => (
  <div className="flex items-center gap-4 mb-6">
    <label className="text-sm font-medium">Search Radius:</label>
    <select
      value={radius}
      onChange={(e) => setRadius(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="all">View All</option>
      <option value={500}>500 meters</option>
      <option value={1000}>1 km</option>
      <option value={2000}>2 km</option>
    </select>
  </div>
);

export default RadiusSelector;
