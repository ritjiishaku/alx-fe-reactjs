import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserCard = ({ user }) => {
    return (
      <div className="user-card">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <h2>{user.name || user.login}</h2>
        {user.bio && <p className="bio">{user.bio}</p>}
        
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-number">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat">
            <span className="stat-number">{user.public_repos}</span>
            <span className="stat-label">Repositories</span>
          </div>
        </div>
        
        <div className="user-meta">
          {user.location && <p><FontAwesomeIcon icon="map-marker-alt" /> {user.location}</p>}
          {user.blog && <p><FontAwesomeIcon icon="link" /> <a href={user.blog} target="_blank" rel="noopener noreferrer">{user.blog}</a></p>}
          {user.twitter_username && (
            <p>
              <FontAwesomeIcon icon={['fab', 'twitter']} />
              <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                @{user.twitter_username}
              </a>
            </p>
          )}
        </div>
        
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
          View GitHub Profile
        </a>
      </div>
    )
  }
  
  export default UserCard