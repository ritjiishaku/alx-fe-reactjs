import axios from 'axios';

const BASE_API_URL = 'https://api.github.com';
const SEARCH_USERS_URL = `${BASE_API_URL}/search/users?q=`;

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

export const searchUsers = async (searchParams) => {
  try {
    const { username, minRepos, location, language } = searchParams;
    
    // Build query string
    let queryParts = [];
    if (username) queryParts.push(`${username} in:login`);
    if (minRepos) queryParts.push(`repos:>${minRepos}`);
    if (location) queryParts.push(`location:${location}`);
    if (language) queryParts.push(`language:${language}`);
    
    if (queryParts.length === 0) {
      throw new Error('Please provide at least one search parameter');
    }

    // Make the search request with explicit search URL
    const response = await axios.get(
      `${SEARCH_USERS_URL}${queryParts.join('+')}`,
      {
        params: {
          per_page: 10
        }
      }
    );

    // Fetch detailed data for each found user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          return await fetchUserData(user.login);
        } catch (error) {
          console.error(`Failed to fetch details for ${user.login}:`, error);
          return null;
        }
      })
    );

    return usersWithDetails.filter(user => user !== null);
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw error;
  }
};