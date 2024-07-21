// components/Dashboard/UserStats.jsx
import React from 'react';

const UserStats = () => {
  // Dummy data for demonstration
  const stats = [
    { label: 'Total Users', value: 1234 },
    { label: 'Active Users', value: 987 },
    { label: 'New Users (This Month)', value: 56 },
    { label: 'Average Session Duration', value: '5m 23s' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>
      {/* Add more detailed statistics or charts here */}
    </div>
  );
};

export default UserStats;