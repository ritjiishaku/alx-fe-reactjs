import axios from "axios";

const BASE_URL = "https://api.github.com";

/**
 * Fetch users based on a search query.
 * @param {string} query - The search term for GitHub users.
 * @param {number} page - The page number for pagination.
 * @param {number} perPage - Number of results per page.
 * @returns {Promise<Object>} - The search results.
 */
export const fetchUsers = async (query, page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query, page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Fetch detailed user data by GitHub username.
 * @param {string} username - The GitHub username.
 * @returns {Promise<Object>} - The user profile data.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
