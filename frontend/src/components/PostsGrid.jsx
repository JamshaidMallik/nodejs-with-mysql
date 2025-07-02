import React from 'react';
import { getPostImageUrl } from '../utils/AppUtils';
import postApi from '../api/postApi';


const PostsGrid = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
                    <img src={post.image
                        ? getPostImageUrl(post.image)  // will build URL here
                        : 'https://placehold.co/600x400'} alt={post.title} className="w-full h-48 object-cover rounded-md mb-3" />
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-4">{post.description}</p>
                </div>
            ))}
        </div>
    );
};

const MyPostsGrid = ({ initialPosts }) => {
    const [posts, setPosts] = React.useState(initialPosts);
    const handleDelete = async (postId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this post?');
            if (!confirmed) return;
            await postApi.deletePost(postId);
            setPosts((prev) => prev.filter((post) => post.id !== postId));
        } catch (err) {
            console.error('Delete error:', err);
            alert(err?.response?.data?.message || 'Failed to delete post');
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-4 transform transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl">
                    <img src={post.image
                        ? getPostImageUrl(post.image)  // will build URL here
                        : 'https://placehold.co/600x400'} alt={post.title} className="w-full h-48 object-cover rounded-md mb-3" />
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-4">{post.description}</p>
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 text-white mt-2 px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                            onClick={() => handleDelete(post.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { PostsGrid, MyPostsGrid };
