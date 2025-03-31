import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

export const fetchAdvancedUserData = async (params) => {
  try {
    let queryParts = [];
    
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:${params.location}`);
    if (params.reposMin) queryParts.push(`repos:>=${params.reposMin}`);
    if (params.reposMax) queryParts.push(`repos:<=${params.reposMax}`);
    if (params.language) queryParts.push(`language:${params.language}`);
    if (params.followersMin) queryParts.push(`followers:>=${params.followersMin}`);
    
    const queryString = queryParts.join('+');
    
    if (!queryString) {
      throw new Error('Please provide at least one search parameter');
    }

    const response = await axios.get(`${GITHUB_API_URL}/search/users`, {
      params: {
        q: queryString,
        per_page: 10
      }
    });
    
    const usersWithDetails = await Promise.all(
      response.data.items.map(user => 
        fetchUserData(user.login).catch(() => null)
      )
    );
    
    return usersWithDetails.filter(user => user !== null);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw error;
  }
};