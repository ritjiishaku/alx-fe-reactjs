import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_GITHUB_API_URL

export const searchGitHubUser = async (username) => {
  const response = await axios.get(`${API_URL}/users/${username}`)
  return response.data
}