import React, { useState, useEffect } from "react";
import Adminsidebar from "../component/sidebar/adminsidebar"; // Adjust path if needed
import { getAllAnnouncementsApi, createAnnouncementApi, deleteAnnouncementApi } from "../../api/api";

const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formVisible, setFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch announcements on component mount
  useEffect(() => {
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

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      console.log('Creating announcement with token:', localStorage.getItem('token'));
      const response = await createAnnouncementApi({ title, content });
      if (response.data.success) {
        setTitle("");
        setContent("");
        setFormVisible(false);
        fetchAnnouncements(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to create announcement: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this announcement?");
    if (confirmed) {
      try {
        const response = await deleteAnnouncementApi(id);
        if (response.data.success) {
          fetchAnnouncements(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Failed to delete announcement');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 text-amber-500">
      {/* Sidebar */}
      <Adminsidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-300">📢 Restaurant Announcements</h1>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded-lg font-semibold transition"
          >
            {formVisible ? "Close" : "➕ Add Announcement"}
          </button>
        </div>

        {/* Form */}
        {formVisible && (
          <form onSubmit={handleAdd} className="mb-10 space-y-4 max-w-2xl bg-white bg-opacity-10 p-6 rounded-xl border border-amber-300 border-opacity-30">
            <input
              type="text"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <textarea
              placeholder="Announcement Content"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-lg bg-white bg-opacity-10 border border-amber-300 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              📢 Post Announcement
            </button>
          </form>
        )}

        {/* Announcement List */}
        <div className="grid gap-6 max-w-4xl">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-amber-200 text-lg">Loading announcements...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-8 text-amber-200">
              <p className="text-lg">No announcements yet.</p>
              <p className="text-sm mt-2">Create your first restaurant announcement to keep customers informed!</p>
            </div>
          ) : (
            announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white bg-opacity-10 p-6 rounded-lg border border-amber-300 border-opacity-30 shadow-lg hover:bg-opacity-15 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-amber-200">{item.title}</h2>
                    <p className="text-amber-300 text-sm mt-1">📅 {new Date(item.date).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 font-semibold text-sm transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
                <p className="text-amber-100 mt-2">{item.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
