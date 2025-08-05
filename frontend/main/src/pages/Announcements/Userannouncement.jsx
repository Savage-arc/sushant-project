import React, { useState, useEffect } from "react";
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllAnnouncementsApi } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils';

const Achievements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from token
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Student');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Student');
      }
    } else {
      setUserName('Student');
    }

    // Fetch announcements from admin
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      console.log('Fetching announcements...');
      const response = await getAllAnnouncementsApi();
      console.log('Announcements response:', response.data);
      
      if (response.data.success) {
        setAnnouncements(response.data.data);
      } else {
        console.log('API returned success: false, using mock data');
        setMockAnnouncements();
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      console.log('Using mock data due to error');
      setMockAnnouncements();
    } finally {
      setLoading(false);
    }
  };

  const setMockAnnouncements = () => {
    setAnnouncements([
      {
        id: 1,
        title: "Welcome to StudyPlanner!",
        content: "Welcome to the new semester! We're excited to help you achieve your academic goals. Make sure to check your study schedule and complete your tasks regularly.",
        date: "2024-01-15T10:00:00.000Z",
        createdBy: 1
      },
      {
        id: 2,
        title: "Important: Midterm Schedule",
        content: "Midterm examinations will begin next week. Please check your course materials and ensure you're prepared. Good luck to all students!",
        date: "2024-01-12T14:30:00.000Z",
        createdBy: 1
      },
      {
        id: 3,
        title: "Study Group Sessions Available",
        content: "We've organized study group sessions for all major subjects. These sessions will help you prepare better for exams and improve your understanding.",
        date: "2024-01-10T09:15:00.000Z",
        createdBy: 1
      },
      {
        id: 4,
        title: "Library Hours Extended",
        content: "The library will now be open until 10 PM on weekdays to accommodate students who prefer evening study sessions.",
        date: "2024-01-08T16:45:00.000Z",
        createdBy: 1
      },
      {
        id: 5,
        title: "Academic Excellence Awards",
        content: "Congratulations to all students who achieved academic excellence last semester. Your hard work and dedication are truly inspiring!",
        date: "2024-01-05T11:20:00.000Z",
        createdBy: 1
      }
    ]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAnnouncementStats = () => {
    const total = announcements.length;
    const thisWeek = announcements.filter(announcement => {
      const announcementDate = new Date(announcement.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return announcementDate >= weekAgo;
    }).length;
    
    const thisMonth = announcements.filter(announcement => {
      const announcementDate = new Date(announcement.date);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return announcementDate >= monthAgo;
    }).length;
    
    return { total, thisWeek, thisMonth };
  };

  const stats = getAnnouncementStats();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      <Usersidebar />

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-300">📢 Announcements</h1>
          <div className="text-lg text-blue-200">Welcome, {userName}!</div>
        </div>

        {/* Announcement Statistics */}
        <div className="mb-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
          <h2 className="text-2xl font-semibold mb-4 text-blue-200">📊 Announcement Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">{stats.total}</div>
              <div className="text-blue-200 text-sm">Total Announcements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">{stats.thisWeek}</div>
              <div className="text-blue-200 text-sm">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">{stats.thisMonth}</div>
              <div className="text-blue-200 text-sm">This Month</div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid gap-6 max-w-4xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-200 text-lg">Loading announcements...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12 bg-white bg-opacity-5 rounded-xl">
              <p className="text-blue-200 text-lg mb-2">No announcements yet.</p>
              <p className="text-blue-300 text-sm">Check back later for important updates!</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white bg-opacity-10 p-6 rounded-xl border border-white border-opacity-20 shadow-lg hover:bg-opacity-15 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📢</div>
                    <div>
                      <h2 className="text-xl font-semibold text-blue-200">{announcement.title}</h2>
                      <span className="px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-xs font-medium">
                        ANNOUNCEMENT
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-300">
                      📅 {formatDate(announcement.date)}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-4">
                  <p className="text-blue-100 leading-relaxed whitespace-pre-wrap">{announcement.content}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-300">
                    📝 Posted by Admin
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-200">📢 Important Information</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions
        <div className="mt-12 bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-semibold text-blue-200 mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-blue-200 font-semibold">Today's Updates</div>
              <div className="text-blue-300 text-sm">View today's announcements</div>
            </button>
            
            <button className="p-4 bg-green-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-blue-200 font-semibold">Important</div>
              <div className="text-blue-300 text-sm">View important announcements</div>
            </button>
            
            <button className="p-4 bg-purple-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-blue-200 font-semibold">Search</div>
              <div className="text-blue-300 text-sm">Search through announcements</div>
            </button>
          </div>
        </div> */}
      </main>
    </div>
  );
};

export default Achievements;
