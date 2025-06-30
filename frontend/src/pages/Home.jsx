import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PostsGrid from '../components/PostsGrid';
import postApi from '../api/postApi';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchPosts = async () => {
        try {
            const postsData = await postApi.getAllPosts();
            setPosts(postsData);
        } catch (err) {
            console.error("Fetch posts error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadAllPosts = () => {
            fetchPosts().catch((err) => {
                console.error("Unhandled fetchProfile error:", err);
            });
        };
        loadAllPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <PostsGrid posts={posts} />
        </div>
    );
};

export default Home;
