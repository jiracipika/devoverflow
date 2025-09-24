import axios from 'axios';

// Base URL for your API - update this with your actual API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials (cookies) with requests if needed
});

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Search APIs
export const searchAll = async (query) => {
  try {
    const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const searchArticles = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams({
      q: query,
      ...filters,
    });
    const response = await api.get(`/search/articles?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching articles:', error);
    throw error;
  }
};

export const searchUsers = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams({
      q: query,
      ...filters,
    });
    const response = await api.get(`/search/users?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const searchTags = async (query) => {
  try {
    const response = await api.get(`/search/tags?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching tags:', error);
    throw error;
  }
};

export const getSearchSuggestions = async (query) => {
  try {
    const response = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    throw error;
  }
};
