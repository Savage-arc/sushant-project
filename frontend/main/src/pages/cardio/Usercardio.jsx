









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllCardioSessionsApi } from "../../api/api";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils'; 

const StudyTimer = () => {
  const navigate = useNavigate();
  const [timerSessions, setTimerSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [studyHistory, setStudyHistory] = useState([]);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('study'); // 'study' or 'break'

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

    // Load study history from localStorage
    const savedHistory = localStorage.getItem('studyHistory');
    if (savedHistory) {
      setStudyHistory(JSON.parse(savedHistory));
    }

    fetchTimerSessions();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTimerSessions();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const fetchTimerSessions = async () => {
    try {
      setLoading(true);
      console.log('Fetching timer sessions for user...');
      const response = await getAllCardioSessionsApi();
      console.log('Timer sessions response:', response.data);
      if (response.data.success) {
        setTimerSessions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching timer sessions:', error);
      console.error('Error response:', error.response?.data);
      // If no sessions exist, use default ones
      setTimerSessions([
        {
          id: 1,
          title: "Pomodoro Study Session",
          description: "25 minutes of focused study followed by a 5-minute break.",
          duration: 25,
          type: "study"
        },
        {
          id: 2,
          title: "Long Study Session",
          description: "50 minutes of intensive study with a 10-minute break.",
          duration: 50,
          type: "study"
        },
        {
          id: 3,
          title: "Quick Review Session",
          description: "15 minutes of quick review and revision.",
          duration: 15,
          type: "study"
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startTimer = (session) => {
    setCurrentTimer(session);
    setTimeLeft(session.duration * 60);
    setIsRunning(true);
    setSessionType('study');
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setCurrentTimer(null);
  };

  const handleSessionComplete = () => {
    if (currentTimer) {
      const completedSession = {
        id: Date.now(),
        sessionTitle: currentTimer.title,
        duration: currentTimer.duration,
        completedAt: new Date().toISOString(),
        type: sessionType
      };
      
      const newHistory = [completedSession, ...studyHistory];
      setStudyHistory(newHistory);
      localStorage.setItem('studyHistory', JSON.stringify(newHistory));
      
      // Switch to break mode
      if (sessionType === 'study') {
        setSessionType('break');
        setTimeLeft(5 * 60); // 5 minute break
        setIsRunning(true);
      } else {
        // Break completed, reset to study mode
        setSessionType('study');
        setTimeLeft(25 * 60);
        setIsRunning(false);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressStats = () => {
    const totalSessions = timerSessions.length;
    const completedCount = studyHistory.length;
    const completionRate = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;
    
    const thisWeek = studyHistory.filter(session => {
      const sessionDate = new Date(session.completedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    }).length;

    const thisMonth = studyHistory.filter(session => {
      const sessionDate = new Date(session.completedAt);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return sessionDate >= monthAgo;
    }).length;

    return {
      totalSessions,
      completedCount,
      completionRate,
      thisWeek,
      thisMonth
    };
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      {/* Sidebar */}
      <Usersidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">⏱️ Study Timer</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              📊 {showProgress ? 'Hide Progress' : 'Show Progress'}
            </button>
            <button
              onClick={fetchTimerSessions}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              🔄 Refresh
            </button>
            <button
              onClick={() => navigate("/userdashboard")}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              ⬅ Back
            </button>
          </div>
        </div>

        {/* Current Timer Display */}
        {currentTimer && (
          <div className="mb-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">
              {sessionType === 'study' ? '📚 Studying' : '☕ Break Time'}
            </h2>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-300 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="text-lg text-blue-200 mb-4">
                {currentTimer.title}
              </div>
              <div className="flex justify-center gap-4">
                {!isRunning ? (
                  <button
                    onClick={() => setIsRunning(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                  >
                    ▶️ Start
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
                  >
                    ⏸️ Pause
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tracker */}
        {showProgress && (
          <div className="mb-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-200">📊 Your Study Progress</h2>
            {(() => {
              const stats = getProgressStats();
              return (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-blue-600 bg-opacity-20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-300">{stats.totalSessions}</div>
                    <div className="text-sm text-blue-200">Total Sessions</div>
                  </div>
                  <div className="text-center p-4 bg-green-600 bg-opacity-20 rounded-lg">
                    <div className="text-2xl font-bold text-green-300">{stats.completedCount}</div>
                    <div className="text-sm text-green-200">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-600 bg-opacity-20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-300">{stats.completionRate}%</div>
                    <div className="text-sm text-yellow-200">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-600 bg-opacity-20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-300">{stats.thisWeek}</div>
                    <div className="text-sm text-purple-200">This Week</div>
                  </div>
                  <div className="text-center p-4 bg-orange-600 bg-opacity-20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-300">{stats.thisMonth}</div>
                    <div className="text-sm text-orange-200">This Month</div>
                  </div>
                </div>
              );
            })()}
            
            {/* Recent Study History */}
            {studyHistory.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-200">Recent Study Sessions</h3>
                <div className="max-h-40 overflow-y-auto">
                  {studyHistory.slice(0, 5).map((session) => (
                    <div key={session.id} className="flex justify-between items-center p-2 bg-white bg-opacity-5 rounded mb-2">
                      <span className="font-medium text-blue-200">{session.sessionTitle}</span>
                      <span className="text-sm text-blue-300">
                        {new Date(session.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timer Sessions */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-blue-200 text-lg">Loading timer sessions...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {timerSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-white border-opacity-20"
              >
                <h2 className="text-2xl font-semibold mb-2 text-blue-200">{session.title}</h2>
                <p className="text-blue-100 mb-4">{session.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-300 font-semibold">⏱️ {session.duration} minutes</span>
                  <button
                    onClick={() => startTimer(session)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Start Timer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTimer;
