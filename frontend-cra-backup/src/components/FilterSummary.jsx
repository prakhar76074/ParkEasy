import React from 'react';

const FilterSummary = ({ city }) => {
  

  return (
    <div className="text-center text-gray-600 mb-4">
      Showing results for <strong>{city}</strong>
    </div>
  );
};

export default FilterSummary;
