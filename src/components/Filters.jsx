import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const filterOptions = {
    status: ['all', 'alive', 'dead', 'unknown'],
    species: ['all', 'human', 'alien', 'humanoid', 'poopybutthole', 'mythological creature', 'robot'],
    type: ['all', 'genetic experiment', 'parasite', 'simulation', 'clone'],
    gender: ['all', 'male', 'female', 'genderless', 'unknown']
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-green-400" />
        <h3 className="text-green-400 font-mono text-sm font-semibold tracking-wide">DIMENSIONAL FILTERS</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="group">
            <label className="block text-green-300/80 font-mono text-xs uppercase tracking-wider mb-2">
              {key}
            </label>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <select
                value={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="relative w-full bg-black/40 backdrop-blur-sm border border-green-400/30 rounded-lg px-3 py-2 text-green-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 appearance-none cursor-pointer"
              >
                {options.map(option => (
                  <option key={option} value={option} className="bg-black/90 text-green-100">
                    {option === 'all' ? 'All' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;