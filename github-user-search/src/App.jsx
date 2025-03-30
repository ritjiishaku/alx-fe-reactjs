import { useState } from 'react'
import AdvancedSearch from './components/AdvancedSearch'
import UserResults from './components/UserResults'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const handleResultsFound = (users) => {
    setUsers(users)
    setHasMore(users.length >= 10) // Assuming 10 per page
    setPage(1)
  }

  const handleLoadMore = async () => {
    // Implement pagination logic if needed
    // This would require modifying the API service to handle pagination
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <AdvancedSearch onResultsFound={handleResultsFound} />
        
        <div className="mt-8">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : (
            <UserResults 
              users={users} 
              onLoadMore={handleLoadMore} 
              hasMore={hasMore} 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App