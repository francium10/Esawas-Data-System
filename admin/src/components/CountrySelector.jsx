import React, { useState } from "react";

const CountrySelector = ({ countries, onSelectCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    onSelectCountry(country); // Call the onSelectCountry callback with the selected country
  };

  return (
    <div className="flex space-x-4 mb-4">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => handleSelect(country)}
          className={`px-4 py-2 text-white ${
            selectedCountry === country ? "bg-blue-600" : "bg-gray-500"
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
};

export default CountrySelector;
