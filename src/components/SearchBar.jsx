import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ search, setSearch, onClear }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-lg blur opacity-75 group-hover:opacity-100transition-opacity"></div>
      <div className="relative bg-black/40 backdrop-blur-sm border border-green-400/30 rounded-lg overflow-hidden shadow-lg shadow-green-400/10">
        <div className="flex items-center">
          <div className="pl-4 pr-2">
            <Search className="w-5 h-5 text-green-400" />
          </div>
          
          <input
            type="text"
            placeholder="Enter character name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent py-3 px-2 text-green-100 placeholder-green-400/60 font-mono text-sm focus:outline-none focus:ring-0"
          />
          
          {search && (
            <button
              onClick={onClear}
              className="px-3 py-2 text-green-400/60 hover:text-green-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;