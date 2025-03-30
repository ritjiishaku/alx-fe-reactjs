import { useState } from "react";
import { fetchUsers } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const data = await fetchUsers(query, 1); // Fetch first page
      if (data.items.length === 0) {
        setError("Looks like we can't find the user");
      } else {
        setUsers(data.items);
        setPage(2); // Next page for pagination
        setHasMore(data.total_count > data.items.length);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const loadMoreUsers = async () => {
    try {
      const data = await fetchUsers(query, page);
      setUsers((prevUsers) => [...prevUsers, ...data.items]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.total_count > users.length + data.items.length);
    } catch (err) {
      setError("An error occurred while loading more users.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="border p-2 rounded mb-2 flex items-center">
              <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full mr-2" />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {user.login}
              </a>
            </div>
          ))
        ) : (
          !error && <p className="mt-4">No users found</p>
        )}
      </div>

      {hasMore && (
        <button onClick={loadMoreUsers} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
