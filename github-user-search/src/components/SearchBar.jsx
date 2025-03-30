import { useState } from 'react'
import { searchGitHubUser } from '../services/githubService'

const SearchBar = ({ onUserFound }) => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username) return
    
    setLoading(true)
    setError(null)
    try {
      const userData = await searchGitHubUser(username)
      onUserFound(userData)
    } catch (err) {
      setError('User not found')
      onUserFound(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default SearchBar