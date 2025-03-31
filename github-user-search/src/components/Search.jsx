import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

const Search = ({ onUserFound }) => {
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
      setError('Looks like we cant find the user')
      onUserFound(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
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
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>

      {/* Example user display with avatar_url and login */}
      {loading && (
        <div className="user-loading">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Loading avatar" 
            className="avatar-placeholder"
          />
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  )
}

export default Search