import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaLightbulb, FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">TaskFlow</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login">
              <button className="px-6 py-2 text-gray-700 hover:text-indigo-600 font-medium transition">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition shadow-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Your Tasks with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">TaskFlow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay organized, boost productivity, and achieve your goals with our powerful task management application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition font-semibold flex items-center justify-center gap-2">
                Get Started <FaArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold">
                Sign In
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <FaCheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Organization</h3>
            <p className="text-gray-600">
              Organize tasks by priority, due date, and status. Keep everything in one place.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <FaClock className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Time Management</h3>
            <p className="text-gray-600">
              Set due dates and get notifications for upcoming tasks. Never miss a deadline.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <FaLightbulb className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Boost Productivity</h3>
            <p className="text-gray-600">
              Stay focused and achieve more with our intuitive task management tools.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of productive users who have already improved their task management with TaskFlow.
          </p>
          <Link to="/signup">
            <button className="px-10 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition font-semibold text-lg">
              Start Free Today
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
