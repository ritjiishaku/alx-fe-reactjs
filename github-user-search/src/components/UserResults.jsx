import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faUser, faStar, faCodeBranch, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

const UserResults = ({ users, onLoadMore, hasMore }) => {
  if (!users || users.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No users found. Try adjusting your search criteria.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="w-16 h-16 rounded-full border-2 border-blue-100"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {user.name || user.login}
                    </h3>
                    {user.login && (
                      <a 
                        href={`https://github.com/${user.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        @{user.login}
                      </a>
                    )}
                  </div>
                  <a 
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </div>

                {user.bio && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {user.bio.length > 100 ? `${user.bio.substring(0, 100)}...` : user.bio}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {user.location && (
                    <span className="flex items-center text-sm text-gray-600">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-gray-400" />
                      {user.location}
                    </span>
                  )}
                  
                  {user.followers !== undefined && (
                    <span className="flex items-center text-sm text-gray-600">
                      <FontAwesomeIcon icon={faUsers} className="mr-1 text-gray-400" />
                      {user.followers} followers
                    </span>
                  )}
                  
                  {user.public_repos !== undefined && (
                    <span className="flex items-center text-sm text-gray-600">
                      <FontAwesomeIcon icon={faCodeBranch} className="mr-1 text-gray-400" />
                      {user.public_repos} repos
                    </span>
                  )}
                </div>

                {user.twitter_username && (
                  <a
                    href={`https://twitter.com/${user.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-blue-500 hover:underline text-sm"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="mr-1" />
                    @{user.twitter_username}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}

export default UserResults