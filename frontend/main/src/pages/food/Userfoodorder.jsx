import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { jwtDecode } from 'jwt-decode';
import { getToken } from '../../utils/authUtils'; 

const Userfoodorder = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

    fetchFoodItems();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchFoodItems();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      console.log('Fetching food items for user...');
      
      // For now, using mock data. In a real app, this would be an API call
      // const response = await getAllFoodItemsApi();
      
      // Mock food items data
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
        },
        {
          id: 4,
          name: "Chocolate Cake",
          description: "Rich chocolate cake with vanilla ice cream",
          price: 8.99,
          category: "dessert",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
          available: true
        },
        {
          id: 5,
          name: "Pasta Carbonara",
          description: "Classic Italian pasta with eggs, cheese, and pancetta",
          price: 18.99,
          category: "main-course",
          image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
          available: true
        },
        {
          id: 6,
          name: "Mushroom Soup",
          description: "Creamy mushroom soup with fresh herbs",
          price: 9.99,
          category: "appetizer",
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400",
          available: true
        }
      ];
      
      setFoodItems(mockFoodItems);
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const filteredFoodItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'appetizer', 'main-course', 'dessert'];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      <Usersidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🍽️ Food Menu</h1>
          <div className="text-lg">Welcome, {userName}!</div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white placeholder-amber-200"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white"
          >
            {categories.map(category => (
              <option key={category} value={category} className="text-gray-800">
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Food Items */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
                <p className="mt-4">Loading delicious food items...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredFoodItems.map((item) => (
                  <div key={item.id} className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg hover:bg-opacity-20 transition">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-amber-200 mb-3 text-sm">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-amber-300">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
                      >
                        {item.available ? 'Add to Cart' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white bg-opacity-10 rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
              
              {cart.length === 0 ? (
                <p className="text-amber-200">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-amber-200">${item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-amber-300 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-amber-300">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => alert('Order placed! This would integrate with a payment system.')}
                      className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                    >
                      Place Order
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userfoodorder; 