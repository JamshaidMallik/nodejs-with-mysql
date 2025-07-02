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
    getMyPosts: async () => {
        const response = await fetch(`${API_URL}/my_post`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!response.ok) throw new Error('Failed to fetch your posts');
        const data = await response.json();
        return data.posts;
    },
    deletePost: async (postId) => {
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete post');
        }
        return response.json();
    },
};

export default postApi;
