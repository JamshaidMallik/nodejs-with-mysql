import React from 'react';
import Navbar from '../components/Navbar';

const MyPost = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Posts</h1>
                <p className="text-gray-600">This is where you will display your own posts.</p>
                {/* Later: Fetch and render user-specific posts here */}
            </div>
        </div>
    );
};

export default MyPost;
