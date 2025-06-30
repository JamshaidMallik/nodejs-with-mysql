import Cookies from "js-cookie";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/post`;
const getToken = () => Cookies.get("token");

const postApi = {
    getAllPosts: async () => {
        const token = getToken();
        if (!token) throw new Error("No token found. Please log in.");
        const response = await fetch(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch posts");
        }

        const data = await response.json();
        return data.posts;
    },
};

export default postApi;
