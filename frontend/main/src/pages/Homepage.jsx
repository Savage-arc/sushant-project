import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-500 to-orange-800 text-white">
      {/* <Nav /> */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md shadow-md">
        <div className="text-2xl font-bold">🍽️ TasteBite</div>
        <div className="flex space-x-4">
          
          {/* <Link to="/trainer"  className="px-4 py-2 bg-cyan-600 border  rounded-full hover:bg-white hover:text-indigo-800 transition">
            Trainer 
          </Link> */}
          <Link to="/loginuser"  className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-orange-800 transition">
            Login
          </Link>
        <Link to="/signupuser" className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-full transition inline-block text-center">
            Sign Up
        </Link>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center px-8 md:px-16 py-16 gap-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Savor Every Bite. <br /> Experience Excellence.
          </h1>
          <p className="text-lg mb-6 max-w-lg mx-auto md:mx-0">
            Discover culinary perfection with our chef-inspired dishes, seasonal menus,
            and unforgettable dining experiences — all crafted with passion.
          </p>
          <Link to="/signupuser" className="bg-white text-orange-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
            Reserve Table
          </Link>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
            alt="Fine Dining Experience"
            className="w-full max-w-md rounded-xl shadow-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default Homepage;


