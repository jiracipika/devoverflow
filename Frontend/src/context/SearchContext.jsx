import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchArticles, searchUsers, searchTags } from '../api/searchApi';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    articles: [],
    users: [],
    tags: [],
    isLoading: false,
    error: null
  });

  const searchAll = async (query) => {
    if (!query.trim()) {
      setSearchResults({
        articles: [],
        users: [],
        tags: [],
        isLoading: false,
        error: null
      });
      return;
    }

    setSearchResults(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Using Promise.all to make parallel API calls
      const [articlesRes, usersRes, tagsRes] = await Promise.all([
        searchArticles(query),
        searchUsers(query),
        searchTags(query)
      ]);

      setSearchResults({
        articles: articlesRes.data || [],
        users: usersRes.data || [],
        tags: tagsRes.data || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch search results'
      }));
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchAll(searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      searchAll
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
