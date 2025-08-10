import React from "react";
import SpotCard from "./SpotCard";

const SpotGrid = ({ spots, generateMapLink }) => {
  if (!spots.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No matching spots found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} generateMapLink={generateMapLink} />
      ))}
    </div>
  );
};

export default SpotGrid;
