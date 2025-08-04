import React, { useState, useEffect } from "react";
import Usersidebar from "../component/sidebar/Usersidebar";
import { getAllAnnouncementsApi } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils';

const UserAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from token
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Guest');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Guest');
      }
    } else {
      setUserName('Guest');
    }

    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await getAllAnnouncementsApi();
      if (response.data.success) {
        setAnnouncements(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      <Usersidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-300">📢 Restaurant Updates</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        <div className="grid gap-6 max-w-4xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-amber-200 text-lg">Loading restaurant updates...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12 bg-white bg-opacity-5 rounded-xl">
              <p className="text-amber-200 text-lg mb-2">No updates available at the moment.</p>
              <p className="text-amber-300 text-sm">Check back later for the latest restaurant news and special offers!</p>
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 shadow-lg hover:bg-opacity-15 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-amber-200">{item.title}</h2>
                  <span className="text-sm text-amber-300 bg-amber-900 bg-opacity-30 px-3 py-1 rounded-full">
                    📅 {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-amber-100 leading-relaxed">{item.content}</p>
                
                {/* Restaurant-themed decoration */}
                <div className="mt-4 pt-4 border-t border-amber-300 border-opacity-30">
                  <div className="flex items-center text-amber-300 text-sm">
                    <span className="mr-2">🍽️</span>
                    <span>TasteBite Restaurant</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Restaurant info section */}
        <div className="mt-12 bg-white bg-opacity-5 rounded-xl p-6 border border-amber-300 border-opacity-30">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">🏪 About TasteBite</h3>
          <p className="text-amber-100 mb-4">
            Stay updated with our latest menu changes, special events, seasonal offers, and restaurant news. 
            We're committed to providing you with the best dining experience possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <div className="text-amber-200 font-semibold">Fresh Menu</div>
              <div className="text-amber-300">Seasonal updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎉</div>
              <div className="text-amber-200 font-semibold">Special Events</div>
              <div className="text-amber-300">Private dining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💝</div>
              <div className="text-amber-200 font-semibold">Exclusive Offers</div>
              <div className="text-amber-300">Member benefits</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAnnouncement;
