import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUser(null);

        try {
            const userData = await fetchUserData(username);
            if (userData) {
                setUser(userData);
            } else {
                setError("Looks like we can't find the user");
            }
        } catch (err) {
            setError("An error occurred while fetching user data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {user && (
                <div className="user-info">
                    <img src={user.avatar_url} alt={user.login} width="100" />
                    <h2>{user.name || user.login}</h2>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                        View Profile
                    </a>
                </div>
            )}
        </div>
    );
};

export default Search;
