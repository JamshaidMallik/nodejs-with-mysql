import React from 'react';
import { getPostImageUrl } from '../utils/AppUtils';


const PostsGrid = ({ posts }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow p-4">
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

export default PostsGrid;
