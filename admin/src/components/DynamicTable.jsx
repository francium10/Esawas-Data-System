// DynamicTable.js
import { useState } from "react";
import { surveyData } from "../data";
import CountrySelector from "./CountrySelector";

const DataTable = ({ data }) => (
  <table className="container mx-auto border-collapse border border-gray-200">
    <thead>
      <tr className="bg-blue-950 text-white">
        <th className="border border-gray-200 p-2">Category</th>
        <th className="border border-gray-200 p-2">Water</th>
        <th className="border border-gray-200 p-2">Sanitation</th>
        <th className="border border-gray-200 p-2">Finance</th>
        <th className="border border-gray-200 p-2">Regulation</th>
        <th className="border border-gray-200 p-2">Utility Operations</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index} className="text-white ">
          <td className="border border-gray-200 bg-blue-950 w-1/4 p-2">
            {row.category}
          </td>
          <td className="border border-gray-200 text-center w-1/5 bg-blue-400  p-2">
            {row.Water}
          </td>
          <td className="border border-gray-200 text-center w-1/5 p-2 bg-green-300">
            {row.Sanitation}
          </td>
          <td className="border border-gray-200 text-center w-1/5 p-2 bg-yellow-300">
            {row.Finance}
          </td>
          <td className="border border-gray-200 text-center w-1/5 p-2 bg-purple-300">
            {row.Regulation}
          </td>
          <td className="border border-gray-200 text-center w-1/5 p-2 bg-orange-300">
            {row["Utility Operations"]}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const DynamicTable = () => {
  const countries = Object.keys(surveyData); // Extract country names
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl mb-4">Select country</h1>
      <CountrySelector
        countries={countries}
        onSelectCountry={setSelectedCountry}
      />
      <DataTable data={surveyData[selectedCountry]} />
    </div>
  );
};

export default DynamicTable;
