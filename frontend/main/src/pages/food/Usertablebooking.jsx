import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils'; 

const StudySchedule = () => {
  const navigate = useNavigate();
  const [studySlots, setStudySlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [bookingDetails, setBookingDetails] = useState({
    subject: '',
    topic: '',
    notes: ''
  });

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

    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    fetchStudySlots();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStudySlots();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchStudySlots = async () => {
    try {
      setLoading(true);
      console.log('Fetching study schedule...');
      
      // Mock study slots data
      const mockStudySlots = [
        {
          id: 1,
          name: "Mathematics Study Session",
          subject: "Mathematics",
          topic: "Calculus - Derivatives",
          time: "09:00",
          duration: 90,
          status: "available",
          location: "Library",
          notes: "Focus on chain rule and implicit differentiation"
        },
        {
          id: 2,
          name: "Physics Lab Review",
          subject: "Physics",
          topic: "Mechanics - Pendulum",
          time: "14:00",
          duration: 120,
          status: "booked",
          location: "Lab Room 101",
          notes: "Review lab report and prepare for quiz"
        },
        {
          id: 3,
          name: "English Literature",
          subject: "English",
          topic: "Shakespeare - Macbeth",
          time: "16:30",
          duration: 60,
          status: "available",
          location: "Study Room A",
          notes: "Essay writing and theme analysis"
        },
        {
          id: 4,
          name: "Chemistry Practice",
          subject: "Chemistry",
          topic: "Organic Chemistry",
          time: "10:30",
          duration: 75,
          status: "available",
          location: "Chemistry Lab",
          notes: "Practice reaction mechanisms"
        },
        {
          id: 5,
          name: "History Research",
          subject: "History",
          topic: "Industrial Revolution",
          time: "13:00",
          duration: 120,
          status: "available",
          location: "Library",
          notes: "Research paper preparation"
        },
        {
          id: 6,
          name: "Biology Study Group",
          subject: "Biology",
          topic: "Cell Division",
          time: "15:00",
          duration: 90,
          status: "available",
          location: "Study Room B",
          notes: "Group study session"
        }
      ];
      
      setStudySlots(mockStudySlots);
    } catch (error) {
      console.error('Error fetching study slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (slot) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time for your study session');
      return;
    }

    if (!bookingDetails.subject || !bookingDetails.topic) {
      alert('Please fill in all required booking details');
      return;
    }

    const booking = {
      slotId: slot.id,
      slotName: slot.name,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      subject: bookingDetails.subject,
      topic: bookingDetails.topic,
      notes: bookingDetails.notes
    };

    alert(`Study session booked for ${slot.name} on ${selectedDate} at ${selectedTime} for ${selectedDuration} minutes!`);
    
    // In a real app, this would send the booking to the backend
    console.log('Booking details:', booking);
  };

  const availableSlots = studySlots.filter(slot => slot.status === 'available');
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  const subjects = ['Mathematics', 'Physics', 'English', 'Chemistry', 'History', 'Biology'];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      <Usersidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📅 Study Schedule</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Study Slots */}
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg mb-6 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">📚 Available Study Sessions</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                  <p className="mt-4 text-blue-200">Loading study schedule...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableSlots.map((slot) => (
                    <div key={slot.id} className="bg-white bg-opacity-5 rounded-lg p-4 hover:bg-opacity-10 transition border border-white border-opacity-20">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-blue-200">{slot.name}</h3>
                        <span className="px-2 py-1 bg-green-600 bg-opacity-20 text-green-300 text-xs rounded-full">
                          Available
                        </span>
                      </div>
                      <div className="text-sm text-blue-200 mb-3">
                        <p>📚 {slot.subject}</p>
                        <p>📖 {slot.topic}</p>
                        <p>⏱️ {slot.duration} minutes</p>
                        <p>📍 {slot.location}</p>
                        {slot.notes && <p>📝 {slot.notes}</p>}
                      </div>
                      <button
                        onClick={() => handleBooking(slot)}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Book This Session
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!loading && availableSlots.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-blue-200">No study sessions available for the selected time. Please try a different time or date.</p>
                </div>
              )}
            </div>

            {/* Weekly Schedule */}
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-white border-opacity-20">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">📅 Weekly Schedule</h2>
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div 
                    key={day} 
                    className="p-3 rounded-lg text-center bg-white bg-opacity-5 border border-white border-opacity-20"
                  >
                    <div className="text-sm font-semibold text-blue-200">{day}</div>
                    <div className="text-xs text-blue-300 mt-1">
                      {Math.floor(Math.random() * 3) + 1} sessions
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-blue-200">
                <p>📊 This week: 12 study sessions planned</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg sticky top-8 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">📝 Schedule Study Session</h2>
              
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-200">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-200">Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time} className="text-gray-800">{time}</option>
                    ))}
                  </select>
                </div>

                {/* Duration Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-200">Duration (minutes)</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                  >
                    {[30, 45, 60, 90, 120].map(duration => (
                      <option key={duration} value={duration} className="text-gray-800">{duration} minutes</option>
                    ))}
                  </select>
                </div>

                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-200">Subject *</label>
                  <select
                    value={bookingDetails.subject}
                    onChange={(e) => setBookingDetails({...bookingDetails, subject: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                  >
                    <option value="">Select subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject} className="text-gray-800">{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Topic */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-200">Topic *</label>
                  <input
                    type="text"
                    value={bookingDetails.topic}
                    onChange={(e) => setBookingDetails({...bookingDetails, topic: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                    placeholder="e.g., Calculus - Derivatives"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-blue-200">Notes</label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={(e) => setBookingDetails({...bookingDetails, notes: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                    rows="3"
                    placeholder="Any specific topics or goals for this study session..."
                  />
                </div>

                <div className="pt-4 border-t border-blue-300">
                  <p className="text-sm text-blue-200 mb-4">
                    * Required fields must be filled to schedule study session
                  </p>
                  <p className="text-xs text-blue-300">
                    💡 Tip: Choose a quiet location and set specific goals for each study session to maximize productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Statistics */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-semibold mb-4 text-blue-200">📊 Study Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">24</div>
              <div className="text-blue-200 text-sm">Total Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">18</div>
              <div className="text-blue-200 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">6</div>
              <div className="text-blue-200 text-sm">Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">75%</div>
              <div className="text-blue-200 text-sm">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySchedule; 