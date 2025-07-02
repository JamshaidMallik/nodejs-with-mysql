import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
     console.log('Token found:', token); // ✅ see token in console
    if (token) {
      // ✅ User has token, redirect to profile
      navigate('/home');
    } else {
      // ✅ No token, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Checking authentication...</h1>
    </div>
  );
};

export default LandingPage;
