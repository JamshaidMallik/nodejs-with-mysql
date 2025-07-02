import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { MyPostsGrid } from '../components/PostsGrid';
import postApi from '../api/postApi';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyPosts = async () => {
        try {
            const myPostsData = await postApi.getMyPosts();
            setPosts(myPostsData);
        } catch (err) {
            console.error("Fetch my posts error:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPosts().catch((err) => console.error("Unhandled fetchMyPosts error:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
                {loading ? (
                    <p className="text-gray-600">Loading your posts...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <MyPostsGrid initialPosts={posts} />
                )}
        </div>
    );
};

export default MyPost;
