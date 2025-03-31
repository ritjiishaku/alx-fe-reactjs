import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = ({ onUsersFound }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUserData(username);
      setUsers([userData]); // Store single user in array for consistent mapping
      onUsersFound([userData]);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUsers([]);
      onUsersFound([]);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Map through users to display results */}
      <div className="user-results">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              className="user-avatar"
            />
            <div className="user-info">
              <h3>{user.name || user.login}</h3>
              <p>Username: {user.login}</p>
              {user.bio && <p className="user-bio">{user.bio}</p>}
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="profile-link"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-indicator">
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default Search;