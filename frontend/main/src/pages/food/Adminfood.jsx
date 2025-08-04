import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../component/sidebar/adminsidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils';
import toast from 'react-hot-toast';

const Adminfood = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main-course',
    image: '',
    available: true
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

    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      // Mock data - in real app, this would be an API call
      const mockFoodItems = [
        {
          id: 1,
          name: "Grilled Salmon",
          description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
          price: 24.99,
          category: "main-course",
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
          available: true
        },
        {
          id: 2,
          name: "Caesar Salad",
          description: "Crisp romaine lettuce with parmesan cheese and caesar dressing",
          price: 12.99,
          category: "appetizer",
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
          available: true
        },
        {
          id: 3,
          name: "Beef Burger",
          description: "Juicy beef patty with fresh vegetables and special sauce",
          price: 16.99,
          category: "main-course",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
          available: true
        }
      ];
      
      setFoodItems(mockFoodItems);
    } catch (error) {
      console.error('Error fetching food items:', error);
      toast.error('Failed to load food items');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingItem) {
        // Update existing item
        const updatedItems = foodItems.map(item => 
          item.id === editingItem.id ? { ...formData, id: item.id } : item
        );
        setFoodItems(updatedItems);
        toast.success('Food item updated successfully!');
      } else {
        // Add new item
        const newItem = {
          ...formData,
          id: Date.now(),
          price: parseFloat(formData.price)
        };
        setFoodItems([...foodItems, newItem]);
        toast.success('Food item added successfully!');
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'main-course',
        image: '',
        available: true
      });
      setShowAddForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving food item:', error);
      toast.error('Failed to save food item');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      available: item.available
    });
    setShowAddForm(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      const updatedItems = foodItems.filter(item => item.id !== itemId);
      setFoodItems(updatedItems);
      toast.success('Food item deleted successfully!');
    }
  };

  const toggleAvailability = (itemId) => {
    const updatedItems = foodItems.map(item => 
      item.id === itemId ? { ...item, available: !item.available } : item
    );
    setFoodItems(updatedItems);
    toast.success('Availability updated!');
  };

  const categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main-course', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'beverage', label: 'Beverage' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      <Adminsidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300">🍽️ Food Menu Management</h1>
          <div className="text-lg text-amber-200">Welcome, {userName}!</div>
        </div>

        {/* Add Food Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingItem(null);
              setFormData({
                name: '',
                description: '',
                price: '',
                category: 'main-course',
                image: '',
                available: true
              });
            }}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold"
          >
            {showAddForm ? 'Cancel' : '➕ Add New Food Item'}
          </button>
        </div>

        {/* Add/Edit Food Form */}
        {showAddForm && (
          <div className="bg-white bg-opacity-10 p-6 rounded-xl mb-8 shadow-lg border border-amber-300">
            <h2 className="text-2xl font-semibold mb-4 text-amber-200">
              {editingItem ? '✏️ Edit Food Item' : '🍽️ Add New Food Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">Food Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
                    placeholder="Enter food name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value} className="text-gray-800">
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-amber-200">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
                  rows="3"
                  placeholder="Describe the food item..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-amber-200">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({...formData, available: e.target.checked})}
                  className="w-4 h-4 text-amber-600 bg-white bg-opacity-10 border-amber-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="available" className="ml-2 text-sm text-amber-200">
                  Available for ordering
                </label>
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({
                        name: '',
                        description: '',
                        price: '',
                        category: 'main-course',
                        image: '',
                        available: true
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

        {/* Food Items List */}
        <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg border border-amber-300">
          <h2 className="text-2xl font-semibold mb-6 text-amber-200">📋 Current Menu Items</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-amber-200">Loading menu items...</p>
            </div>
          ) : foodItems.length === 0 ? (
            <div className="text-center py-8 text-amber-200">
              <p className="text-lg">No food items found.</p>
              <p className="text-sm mt-2">Add your first menu item to get started!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {foodItems.map((item) => (
                <div key={item.id} className="bg-white bg-opacity-5 p-6 rounded-lg border border-amber-300 border-opacity-30 hover:bg-opacity-10 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-amber-200">{item.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.available 
                              ? 'bg-green-600 bg-opacity-20 text-green-300' 
                              : 'bg-red-600 bg-opacity-20 text-red-300'
                          }`}>
                            {item.available ? 'Available' : 'Unavailable'}
                          </span>
                          <span className="px-2 py-1 bg-amber-600 bg-opacity-20 text-amber-300 rounded-full text-xs">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-amber-100 mb-2">{item.description}</p>
                        <p className="text-2xl font-bold text-amber-300">${item.price}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700 transition text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => toggleAvailability(item.id)}
                        className={`px-3 py-1 rounded transition text-sm ${
                          item.available
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {item.available ? '🚫 Disable' : '✅ Enable'}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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

        {/* Menu Statistics */}
        <div className="mt-8 bg-white bg-opacity-5 rounded-xl p-6 border border-amber-300 border-opacity-30">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">📊 Menu Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">{foodItems.length}</div>
              <div className="text-amber-200 text-sm">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">
                {foodItems.filter(item => item.available).length}
              </div>
              <div className="text-amber-200 text-sm">Available Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">
                ${foodItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
              <div className="text-amber-200 text-sm">Total Menu Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-300">
                {categories.length}
              </div>
              <div className="text-amber-200 text-sm">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminfood; 