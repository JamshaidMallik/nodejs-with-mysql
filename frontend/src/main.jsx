import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './pages/PrivateRoute';
import Home from './pages/Home';
import MyPost from './pages/MyPost';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/my-posts" element={<PrivateRoute><MyPost /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
