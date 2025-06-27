import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Please sign in to your account
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="password"
                    className="block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {/* eye icon SVG goes here if needed */}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-red-600 hover:text-red-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span>Sign In</span>
              </button>
            </form>

            <p className="mt-6 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-red-600 hover:text-red-700">
                Sign up now
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
