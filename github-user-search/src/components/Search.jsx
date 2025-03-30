import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchUsers = async (newSearch = false) => {
    if (newSearch) setPage(1);

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://api.github.com/search/users`, {
        params: {
          q: query,
          page: newSearch ? 1 : page,
          per_page: 10, // Number of users per page
        },
      });

      if (newSearch) {
        setUsers(response.data.items);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...response.data.items]);
      }

      // GitHub API returns max 1000 results, so we assume more pages if items exist
      setHasMore(response.data.items.length > 0);
    } catch (err) {
      setError("Looks like we can't find the user");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchUsers(true); // New search resets pagination
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(false);
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub username..."
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* User Results */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow-md flex items-center gap-4">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-lg font-bold">{user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <button
          onClick={handleLoadMore}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 block mx-auto"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
