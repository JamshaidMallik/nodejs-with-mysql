import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { PostsGrid } from '../components/PostsGrid';
import postApi from '../api/postApi';
import Carousel from 'react-multi-carousel'; // assuming you already installed it
import 'react-multi-carousel/lib/styles.css';

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
            <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                infinite
                keyBoardControl
                responsive={{
                    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
                    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
                    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                }}
                showDots
                containerClass="w-full my-6"
                itemClass="w-full"
            >
                <img
                    src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?auto=format&fit=crop&w=1200&q=80"
                    alt="Slide 1"
                    className="w-full h-[500px] object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?auto=format&fit=crop&w=1200&q=80"
                    alt="Slide 2"
                    className="w-full h-[500px] object-cover"
                />
                <img
                    src="https://images.unsplash.com/photo-1550133730-695473e544be?auto=format&fit=crop&w=1200&q=80"
                    alt="Slide 3"
                    className="w-full h-[500px] object-cover"
                />
            </Carousel>
            <PostsGrid posts={posts} />
            <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">YourBrand</h2>
                        <p className="text-gray-400">Building amazing apps with modern technologies.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline hover:text-white">About Us</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Careers</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Blog</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline hover:text-white">Help Center</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Terms of Service</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline hover:text-white">Accessibility</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe for updates and news.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-l bg-gray-800 text-white focus:outline-none" />
                            <button className="px-4 py-2 bg-red-600 rounded-r text-white hover:bg-red-700 transition">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default Home;
