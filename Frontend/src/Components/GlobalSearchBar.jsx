import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { Search } from 'lucide-react';

const GlobalSearchBar = ({ className = '', placeholder = 'Search articles, users, tags...' }) => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl ${className}`}
    >
      <div className="relative">
        <Search 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            isFocused ? 'text-blue-500' : 'text-[#7B8EC8]'
          } h-5 w-5`} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full bg-[#1E1E1E] dark:bg-gray-700 text-white rounded-lg pl-12 pr-4 py-3 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
            ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
        />
      </div>
    </form>
  );
};

export default GlobalSearchBar;
