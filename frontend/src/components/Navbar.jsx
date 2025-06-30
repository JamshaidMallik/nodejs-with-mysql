import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, log me out",
        }).then((result) => {
            if (result.isConfirmed) {
                Cookies.remove("token");
                navigate("/login");
            }
        });
    };
    const isActive = (path) =>
        location.pathname === path
            ? "text-red-600 border-b-2 border-red-600 font-semibold"
            : "text-gray-800 hover:text-red-600";

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex space-x-6 sm:space-x-8">
                    <Link to="/home" className={`${isActive("/home")} font-medium`}>
                        Home
                    </Link>
                    <Link to="/my-posts" className={`${isActive("/my-posts")} font-medium`}>
                        My Post
                    </Link>
                    <Link to="/profile" className={`${isActive("/profile")} font-medium`}>
                        Profile
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
