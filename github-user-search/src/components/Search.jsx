import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await axios.get(`https://api.github.com/users/${query}`);
      setUser(response.data);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchUserData();
    }
  };

  return (
    <div className="p-4">
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

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {user && (
        <div className="border p-4 rounded shadow-md">
          <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
          <h2 className="text-lg font-bold">{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
