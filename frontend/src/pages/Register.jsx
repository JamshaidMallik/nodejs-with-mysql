import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-red-600">
                Create an Account
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Sign up to get started
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Jamshaid"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="jamshaid@example.com"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="SecurePass123"
                  className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-red-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-center text-sm">
              Already have an account?{' '}
              <Link to="/" className="font-medium text-red-600 hover:text-red-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
