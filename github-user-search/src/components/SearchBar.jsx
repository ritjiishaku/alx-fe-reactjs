import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

const SearchBar = ({ onUserFound }) => {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const userData = await fetchUserData(username)
      onUserFound(userData)
    } catch (err) {
      setError('Looks like we can\'t find the user')
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
        disabled={loading}
      />
      <button type="submit" disabled={loading || !username.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default SearchBar