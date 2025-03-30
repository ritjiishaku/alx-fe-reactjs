import axios from "axios";

const GITHUB_API = "https://api.github.com/users/";

export const fetchGitHubUser = async (username) => {
    try {
        const response = await axios.get(`${GITHUB_API}${username}`, {
            headers: {
                Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
