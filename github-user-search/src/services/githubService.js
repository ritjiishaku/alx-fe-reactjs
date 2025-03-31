import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

export const searchGitHubUsers = async (queryParams) => {
  try {
    const { username, location, minRepos, language } = queryParams;
    let query = [];
    
    if (username) query.push(`${username} in:login`);
    if (location) query.push(`location:${location}`);
    if (minRepos) query.push(`repos:>${minRepos}`);
    if (language) query.push(`language:${language}`);
    
    if (query.length === 0) {
      throw new Error('Please provide at least one search parameter');
    }

    const response = await axios.get(
      `${GITHUB_API_URL}/search/users?q=${query.join('+')}`,
      {
        params: {
          per_page: 10
        }
      }
    );

    // Fetch detailed data for each user
    const users = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await fetchUserData(user.login);
          return userDetails;
        } catch (error) {
          console.error(`Failed to fetch details for user ${user.login}:`, error);
          return null;
        }
      })
    );

    return users.filter(user => user !== null);
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw error;
  }
};