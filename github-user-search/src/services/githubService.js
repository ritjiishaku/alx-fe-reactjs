import axios from "axios";

export const fetchUsers = async (username, location, minRepos) => {
    let query = `q=${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>${minRepos}`;

    const API_URL = `https://api.github.com/search/users?${query}`;

    try {
        const response = await axios.get(API_URL);
        const users = response.data.items || [];
        return Promise.all(
            users.map(async (user) => {
                const userDetails = await axios.get(user.url);
                return { ...userDetails.data };
            })
        );
    } catch (error) {
        return [];
    }
};
