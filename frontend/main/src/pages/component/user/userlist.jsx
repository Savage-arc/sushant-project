import React, { useState, useEffect } from "react";
import Adminsidebar from "../sidebar/adminsidebar";
import { getAllUsersApi, getAllUsersPublicApi } from "../../../api/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formVisible, setFormVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users with token:', localStorage.getItem('token'));
      
      // Try the authenticated endpoint first
      try {
        const response = await getAllUsersApi();
        console.log('Users response:', response.data);
        if (response.data.success) {
          setUsers(response.data.data);
          return;
        }
      } catch (authError) {
        console.log('Auth endpoint failed, trying public endpoint:', authError.response?.data);
      }
      
      // Fallback to public endpoint for testing
      const publicResponse = await getAllUsersPublicApi();
      console.log('Public users response:', publicResponse.data);
      if (publicResponse.data.success) {
        setUsers(publicResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to fetch users: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.age || !newUser.address) return;

    const newEntry = {
      id: Date.now(),
      ...newUser,
    };

    setUsers([newEntry, ...users]);
    setNewUser({ name: "", email: "", age: "", address: "" });
    setFormVisible(false);
  };

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      <Adminsidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300">👥 Customer Management</h1>
          <div className="text-lg text-amber-200">Restaurant Customers</div>
        </div>

        {/* Statistics Card */}
        <div className="bg-white bg-opacity-10 p-6 rounded-xl mb-8 border border-amber-300 border-opacity-30">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-300 mb-2">
              {loading ? "Loading..." : users.length}
            </div>
            <div className="text-amber-200 text-lg">Total Customers</div>
          </div>
        </div>
        
        {/* Add User Button (commented out) */}
        {/* <button
          onClick={() => setFormVisible(!formVisible)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {formVisible ? "Close" : "+ Add User"}
        </button> */}

        {formVisible && (
          <form onSubmit={handleAddUser} className="bg-white bg-opacity-10 p-6 rounded-xl mb-8 space-y-4 border border-amber-300">
            <input
              type="text"
              placeholder="Customer Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Add Customer
            </button>
          </form>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
            <p className="text-amber-200 text-lg">Loading customer details...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-amber-200">
            <p className="text-lg">No customers found.</p>
            <p className="text-sm mt-2">Customers will appear here once they register.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 border-opacity-30 hover:bg-opacity-15 transition">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-amber-200">{user.name}</h2>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-red-600 bg-opacity-20 text-red-300' : 'bg-green-600 bg-opacity-20 text-green-300'
                  }`}>
                    {user.role || 'customer'}
                  </span>
                </div>
                <div className="space-y-2 text-amber-100">
                  <p><strong>📧 Email:</strong> {user.email}</p>
                  <p><strong>🎂 Age:</strong> {user.age}</p>
                  <p><strong>📍 Address:</strong> {user.address}</p>
                  <p><strong>📅 Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                {/* <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
