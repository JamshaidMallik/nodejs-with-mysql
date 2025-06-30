import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL;  // Vite


const API_URL = `${BASE_URL}/auth`;

const getToken = () => Cookies.get("token");

const authApi = {
    login: async (formData) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        return response.json();
    },
    getProfile: async () => {
        const token = getToken();
        if (!token) throw new Error("No token found. Please log in.");

        const response = await fetch(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch profile");
        }

        return response.json();
    },
    updateProfile: async (formData) => {
        const token = getToken();
        if (!token) throw new Error("No token found. Please log in.");
        const response = await fetch(`${API_URL}/update_profile`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update profile");
        }
        return response.json();
    },
};

export default authApi;
