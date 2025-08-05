import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
      {/* <Nav /> */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md shadow-md">
        <div className="text-2xl font-bold">📚 StudyPlanner</div>
        <div className="flex space-x-4">
          
          {/* <Link to="/trainer"  className="px-4 py-2 bg-cyan-600 border  rounded-full hover:bg-white hover:text-indigo-800 transition">
            Trainer 
          </Link> */}
          <Link to="/loginuser"  className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-800 transition">
            Login
          </Link>
        <Link to="/signupuser" className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full transition inline-block text-center">
            Sign Up
        </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center px-8 md:px-16 py-16 gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Master Your Studies. <br /> Achieve Your Goals.
          </h1>
          <p className="text-lg mb-6 max-w-lg mx-auto md:mx-0">
            Transform your learning experience with our comprehensive study planner. 
            Organize tasks, track progress, and stay motivated with personalized study schedules.
          </p>
          <Link to="/signupuser" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Start Learning
          </Link>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
            alt="Study Planning"
            className="w-full max-w-md rounded-xl shadow-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default Homepage;


