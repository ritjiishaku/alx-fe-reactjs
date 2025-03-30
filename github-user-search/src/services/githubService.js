import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`)
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found')
    }
    throw new Error('Failed to fetch user data')
  }
}

export const fetchAdvancedUserData = async (params) => {
  try {
    // Construct query string based on provided parameters
    let queryParts = []
    
    if (params.username) queryParts.push(`${params.username} in:login`)
    if (params.location) queryParts.push(`location:${params.location}`)
    if (params.reposMin) queryParts.push(`repos:>=${params.reposMin}`)
    if (params.reposMax) queryParts.push(`repos:<=${params.reposMax}`)
    if (params.language) queryParts.push(`language:${params.language}`)
    if (params.followersMin) queryParts.push(`followers:>=${params.followersMin}`)
    
    const queryString = queryParts.join('+')
    
    if (!queryString) {
      throw new Error('Please provide at least one search parameter')
    }

    const response = await axios.get(`${API_URL}/search/users`, {
      params: {
        q: queryString,
        per_page: 10
      }
    })
    
    // Fetch detailed data for each user (GitHub's search API returns limited info)
    const usersWithDetails = await Promise.all(
      response.data.items.map(user => 
        fetchUserData(user.login).catch(() => null)
      )
    )
    
    return usersWithDetails.filter(user => user !== null)
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.')
    }
    throw error
  }
}