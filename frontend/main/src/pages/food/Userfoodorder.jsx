import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils'; 

const TaskManager = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
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

    fetchTasks();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTasks();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      console.log('Fetching tasks for user...');
      
      // Mock tasks data
      const mockTasks = [
        {
          id: 1,
          title: "Mathematics Assignment - Calculus",
          description: "Complete problems 1-15 in Chapter 3. Focus on derivatives and applications.",
          subject: "Mathematics",
          dueDate: "2024-01-15",
          priority: "high",
          status: "pending",
          completed: false
        },
        {
          id: 2,
          title: "Physics Lab Report",
          description: "Write lab report for the pendulum experiment. Include graphs and analysis.",
          subject: "Physics",
          dueDate: "2024-01-12",
          priority: "medium",
          status: "in-progress",
          completed: false
        },
        {
          id: 3,
          title: "English Essay - Shakespeare",
          description: "Write a 1000-word essay on the themes in Macbeth. Include citations.",
          subject: "English",
          dueDate: "2024-01-18",
          priority: "low",
          status: "pending",
          completed: false
        },
        {
          id: 4,
          title: "Chemistry Quiz Preparation",
          description: "Review chapters 5-7 for the upcoming quiz on organic chemistry.",
          subject: "Chemistry",
          dueDate: "2024-01-10",
          priority: "high",
          status: "completed",
          completed: true
        },
        {
          id: 5,
          title: "History Research Paper",
          description: "Research and write a paper on the Industrial Revolution's impact on society.",
          subject: "History",
          dueDate: "2024-01-20",
          priority: "medium",
          status: "pending",
          completed: false
        },
        {
          id: 6,
          title: "Biology Lab Worksheet",
          description: "Complete the cell division worksheet and submit online.",
          subject: "Biology",
          dueDate: "2024-01-14",
          priority: "low",
          status: "pending",
          completed: false
        }
      ];
      
      setTasks(mockTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.subject || !newTask.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const task = {
      ...newTask,
      id: Date.now(),
      completed: false
    };

    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      subject: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending'
    });
    setShowAddTask(false);
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: task.completed ? 'pending' : 'completed' }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-600 bg-opacity-20';
      case 'medium': return 'text-yellow-400 bg-yellow-600 bg-opacity-20';
      case 'low': return 'text-green-400 bg-green-600 bg-opacity-20';
      default: return 'text-gray-400 bg-gray-600 bg-opacity-20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-600 bg-opacity-20';
      case 'in-progress': return 'text-blue-400 bg-blue-600 bg-opacity-20';
      case 'pending': return 'text-yellow-400 bg-yellow-600 bg-opacity-20';
      default: return 'text-gray-400 bg-gray-600 bg-opacity-20';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const priorities = ['all', 'high', 'medium', 'low'];
  const subjects = ['Mathematics', 'Physics', 'English', 'Chemistry', 'History', 'Biology'];

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    const overdue = tasks.filter(task => !task.completed && new Date(task.dueDate) < new Date()).length;
    
    return { total, completed, pending, overdue };
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      <Usersidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📝 Task Manager</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        {/* Task Statistics */}
        <div className="mb-6 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
          <h2 className="text-xl font-semibold mb-4 text-blue-200">📊 Task Overview</h2>
          {(() => {
            const stats = getTaskStats();
            return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300">{stats.total}</div>
                  <div className="text-blue-200 text-sm">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-300">{stats.completed}</div>
                  <div className="text-green-200 text-sm">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">{stats.pending}</div>
                  <div className="text-yellow-200 text-sm">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-300">{stats.overdue}</div>
                  <div className="text-red-200 text-sm">Overdue</div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white placeholder-blue-200"
          />
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority} className="text-gray-800">
                {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddTask(!showAddTask)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            {showAddTask ? 'Cancel' : '➕ Add Task'}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddTask && (
          <div className="mb-6 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-semibold mb-4 text-blue-200">📝 Add New Task</h3>
            <form onSubmit={addTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Task Title *</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white placeholder-blue-200"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Subject *</label>
                  <select
                    value={newTask.subject}
                    onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                    required
                  >
                    <option value="">Select subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject} className="text-gray-800">{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-blue-200">Description *</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white placeholder-blue-200"
                  rows="3"
                  placeholder="Describe the task..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Due Date *</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-blue-300 text-white"
                  >
                    <option value="high" className="text-gray-800">High</option>
                    <option value="medium" className="text-gray-800">Medium</option>
                    <option value="low" className="text-gray-800">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                <p className="mt-4 text-blue-200">Loading your tasks...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className={`bg-white bg-opacity-10 rounded-xl p-6 shadow-lg hover:bg-opacity-20 transition border border-white border-opacity-20 ${
                    task.completed ? 'opacity-75' : ''
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskStatus(task.id)}
                            className="w-4 h-4 text-blue-600 bg-white bg-opacity-10 border-blue-300 rounded focus:ring-blue-500"
                          />
                          <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-blue-300' : 'text-blue-200'}`}>
                            {task.title}
                          </h3>
                        </div>
                        <p className="text-blue-100 mb-3">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-xs">
                            📚 {task.subject}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-blue-300">
                          <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          {new Date(task.dueDate) < new Date() && !task.completed && (
                            <span className="text-red-400 font-semibold">⚠️ OVERDUE</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`px-3 py-1 rounded transition text-sm ${
                            task.completed
                              ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {task.completed ? '🔄 Undo' : '✅ Complete'}
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
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

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg sticky top-8 border border-white border-opacity-20">
              <h2 className="text-2xl font-bold mb-4 text-blue-200">⚡ Quick Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full p-4 bg-blue-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="font-semibold text-blue-200">Today's Tasks</div>
                  <div className="text-sm text-blue-300">View tasks due today</div>
                </button>
                
                <button className="w-full p-4 bg-green-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
                  <div className="text-2xl mb-2">✅</div>
                  <div className="font-semibold text-blue-200">Completed</div>
                  <div className="text-sm text-blue-300">View completed tasks</div>
                </button>
                
                <button className="w-full p-4 bg-red-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
                  <div className="text-2xl mb-2">⚠️</div>
                  <div className="font-semibold text-blue-200">Overdue</div>
                  <div className="text-sm text-blue-300">View overdue tasks</div>
                </button>
                
                <button className="w-full p-4 bg-purple-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold text-blue-200">Progress</div>
                  <div className="text-sm text-blue-300">View task statistics</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager; 