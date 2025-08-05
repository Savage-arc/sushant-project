import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../component/sidebar/adminsidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils';
import toast from 'react-hot-toast';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'beginner',
    image: '',
    active: true
  });

  useEffect(() => {
    // Get user name from token
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || 'Admin');
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserName('Admin');
      }
    } else {
      setUserName('Admin');
    }

    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Mock data - in real app, this would be an API call
      const mockCourses = [
        {
          id: 1,
          name: "Mathematics Fundamentals",
          description: "Basic mathematics concepts including algebra, geometry, and arithmetic",
          instructor: "Dr. Sarah Johnson",
          duration: "12 weeks",
          level: "beginner",
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
          active: true
        },
        {
          id: 2,
          name: "Advanced Physics",
          description: "Advanced physics concepts including mechanics, thermodynamics, and quantum physics",
          instructor: "Prof. Michael Chen",
          duration: "16 weeks",
          level: "advanced",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
          active: true
        },
        {
          id: 3,
          name: "English Literature",
          description: "Study of classic and modern English literature with critical analysis",
          instructor: "Dr. Emily Davis",
          duration: "14 weeks",
          level: "intermediate",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
          active: true
        }
      ];
      
      setCourses(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.instructor || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingCourse) {
        // Update existing course
        const updatedCourses = courses.map(course => 
          course.id === editingCourse.id ? { ...formData, id: course.id } : course
        );
        setCourses(updatedCourses);
        toast.success('Course updated successfully!');
      } else {
        // Add new course
        const newCourse = {
          ...formData,
          id: Date.now()
        };
        setCourses([...courses, newCourse]);
        toast.success('Course added successfully!');
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        instructor: '',
        duration: '',
        level: 'beginner',
        image: '',
        active: true
      });
      setShowAddForm(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to save course');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      image: course.image,
      active: course.active
    });
    setShowAddForm(true);
  };

  const handleDelete = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = courses.filter(course => course.id !== courseId);
      setCourses(updatedCourses);
      toast.success('Course deleted successfully!');
    }
  };

  const toggleActive = (courseId) => {
    const updatedCourses = courses.map(course => 
      course.id === courseId ? { ...course, active: !course.active } : course
    );
    setCourses(updatedCourses);
    toast.success('Course status updated!');
  };

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      <Adminsidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-300">📚 Course Management</h1>
          <div className="text-lg text-blue-200">Welcome, {userName}!</div>
        </div>

        {/* Add Course Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingCourse(null);
              setFormData({
                name: '',
                description: '',
                instructor: '',
                duration: '',
                level: 'beginner',
                image: '',
                active: true
              });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            {showAddForm ? 'Cancel' : '➕ Add New Course'}
          </button>
        </div>

        {/* Add/Edit Course Form */}
        {showAddForm && (
          <div className="bg-white bg-opacity-10 p-6 rounded-xl mb-8 shadow-lg border border-blue-300">
            <h2 className="text-2xl font-semibold mb-4 text-blue-200">
              {editingCourse ? '✏️ Edit Course' : '📚 Add New Course'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Course Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 text-white placeholder-blue-200"
                    placeholder="Enter course name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Instructor *</label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 text-white placeholder-blue-200"
                    placeholder="Enter instructor name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-200">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 text-white placeholder-blue-200"
                  rows="3"
                  placeholder="Describe the course content..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Duration *</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 text-white placeholder-blue-200"
                    placeholder="e.g., 12 weeks, 3 months"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 text-white"
                  >
                    {levels.map(level => (
                      <option key={level.value} value={level.value} className="text-gray-800">
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-200">Course Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 text-white placeholder-blue-200"
                  placeholder="https://example.com/course-image.jpg"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({...formData, active: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-white bg-opacity-10 border-blue-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="active" className="ml-2 text-sm text-blue-200">
                  Course is active and available for enrollment
                </label>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
                {editingCourse && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCourse(null);
                      setFormData({
                        name: '',
                        description: '',
                        instructor: '',
                        duration: '',
                        level: 'beginner',
                        image: '',
                        active: true
                      });
                    }}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Courses List */}
        <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-blue-300">
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">📋 Current Courses</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-200">Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-blue-200">
              <p className="text-lg">No courses found.</p>
              <p className="text-sm mt-2">Add your first course to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white bg-opacity-5 p-6 rounded-lg border border-blue-300 border-opacity-30 hover:bg-opacity-10 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-blue-200">{course.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.active 
                              ? 'bg-green-600 bg-opacity-20 text-green-300' 
                              : 'bg-red-600 bg-opacity-20 text-red-300'
                          }`}>
                            {course.active ? 'Active' : 'Inactive'}
                          </span>
                          <span className="px-2 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-xs">
                            {course.level}
                          </span>
                        </div>
                        <p className="text-blue-100 mb-2">{course.description}</p>
                        <div className="flex gap-4 text-sm text-blue-200">
                          <span>👨‍🏫 {course.instructor}</span>
                          <span>⏱️ {course.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => toggleActive(course.id)}
                        className={`px-3 py-1 rounded transition text-sm ${
                          course.active
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {course.active ? '🚫 Deactivate' : '✅ Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Course Statistics */}
        <div className="mt-8 bg-white bg-opacity-5 rounded-xl p-6 border border-blue-300 border-opacity-30">
          <h3 className="text-xl font-semibold text-blue-200 mb-4">📊 Course Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">{courses.length}</div>
              <div className="text-blue-200 text-sm">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {courses.filter(course => course.active).length}
              </div>
              <div className="text-blue-200 text-sm">Active Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {courses.filter(course => course.level === 'beginner').length}
              </div>
              <div className="text-blue-200 text-sm">Beginner Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">
                {levels.length}
              </div>
              <div className="text-blue-200 text-sm">Difficulty Levels</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement; 