import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useTable } from 'react-table';
import { FaFilter } from 'react-icons/fa';

// Sample data (for demonstration)
const data = [
  { category: "Urban Water Supply (Sector Monitoring)", percentages: [80, 60, 75, 90, 50, 70] },
  { category: "Rural Water Supply (Sector Monitoring)", percentages: [65, 55, 80, 60, 40, 75] },
  { category: "Urban Sanitation (Sector Monitoring)", percentages: [90, 70, 85, 80, 65, 90] },
  { category: "Rural Sanitation (Sector Monitoring)", percentages: [50, 40, 60, 45, 70, 55] },
  { category: "Finance Regulation", percentages: [75, 85, 65, 80, 50, 60] },
  { category: "Utility Operations", percentages: [80, 55, 75, 90, 85, 95] },
  { category: "Finance", percentages: [67, 95, 85, 90, 81, 75] },
  
];

// Helper function to set color based on percentage
const getColor = (value) => {
  if (value >= 75) return "bg-green-500";
  if (value >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const MappingDashboard = () => {
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Organizational Level Mapping Dashboard – NWASCO</h2>

      {/* Filter Section */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaFilter className="text-gray-600 mr-2" />
          <select className="p-2 border rounded bg-white mr-4">
            <option>Country</option>
            <option>Zambia</option>
            <option>Burundi</option>
            <option>Uganda</option>
          </select>
          <select className="p-2 border rounded bg-white">
            <option>Organisation</option>
            <option>NWASCO </option>
            <option>IREEN</option>
          </select>
        </div>
      </div>

      {/* Mapping Dashboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Category</th>
              <th className="p-3">Data Collection</th>
              <th className="p-3">Data Ownership</th>
              <th className="p-3">Data Openness</th>
              <th className="p-3">Data Quality</th>
              <th className="p-3">Data Use</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                <td className="p-3">{row.category}</td>
                {row.percentages.map((percentage, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-3 text-center cursor-pointer ${getColor(percentage)}`}
                    onClick={() => setSelectedData({ category: row.category, percentage })}
                  >
                    {percentage}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dropdown Table (Visible on Cell Click) */}
      {selectedData && (
        <div className="mt-6 p-4 border bg-gray-50 shadow-md">
          <h3 className="text-xl font-semibold mb-3">
            Details for {selectedData.category} - {selectedData.percentage}%
          </h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Question Theme</th>
                <th className="p-3">Organisation(s) Responsible</th>
                <th className="p-3">Average Effectiveness Score</th>
                <th className="p-3">Most Reported Barriers</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy rows for demonstration */}
              <tr className="border-b">
                <td className="p-3">Data Quality Control</td>
                <td className="p-3">Ministry of Health</td>
                <td className="p-3 bg-yellow-500 text-center">70%</td>
                <td className="p-3">Lack of consistency in reporting</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Data Accuracy Checks</td>
                <td className="p-3">Utility Boards</td>
                <td className="p-3 bg-green-500 text-center">85%</td>
                <td className="p-3">Insufficient tools for validation</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MappingDashboard;
