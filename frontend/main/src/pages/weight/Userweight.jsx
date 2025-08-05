import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Usersidebar from "../component/sidebar/usersidebar";
import { getAllWeightSessionsApi } from "../../api/api";
const CourseMaterials = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await getAllWeightSessionsApi();
      if (response.data.success) {
        setMaterials(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching course materials:', error);
      // If no materials exist, use default ones
      setMaterials([
        {
          id: 1,
          title: "Mathematics Textbook",
          description: "Comprehensive textbook covering algebra, geometry, and calculus fundamentals.",
          category: "textbook",
          subject: "Mathematics",
          format: "PDF",
          size: "15.2 MB"
        },
        {
          id: 2,
          title: "Physics Lab Manual",
          description: "Step-by-step laboratory experiments for mechanics and thermodynamics.",
          category: "lab-manual",
          subject: "Physics",
          format: "PDF",
          size: "8.7 MB"
        },
        {
          id: 3,
          title: "English Literature Anthology",
          description: "Collection of classic and modern literary works with analysis.",
          category: "textbook",
          subject: "English",
          format: "PDF",
          size: "22.1 MB"
        },
        {
          id: 4,
          title: "Chemistry Video Lectures",
          description: "Video lectures covering organic chemistry and chemical reactions.",
          category: "video",
          subject: "Chemistry",
          format: "MP4",
          size: "156.3 MB"
        },
        {
          id: 5,
          title: "History Study Guide",
          description: "Comprehensive study guide for world history and modern events.",
          category: "study-guide",
          subject: "History",
          format: "PDF",
          size: "12.8 MB"
        },
        {
          id: 6,
          title: "Biology Lab Videos",
          description: "Virtual lab demonstrations for cell biology and genetics.",
          category: "video",
          subject: "Biology",
          format: "MP4",
          size: "89.5 MB"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const downloadMaterial = (material) => {
    // In a real app, this would trigger a download
    alert(`Downloading ${material.title}...`);
    console.log('Downloading material:', material);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'textbook': return '📚';
      case 'lab-manual': return '🧪';
      case 'video': return '🎥';
      case 'study-guide': return '📖';
      case 'worksheet': return '📝';
      default: return '📄';
    }
  };

  const getFormatColor = (format) => {
    switch (format) {
      case 'PDF': return 'text-red-400';
      case 'MP4': return 'text-blue-400';
      case 'DOC': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const filteredMaterials = materials.filter(material => {
    return selectedCategory === 'all' || material.category === selectedCategory;
  });

  const categories = [
    { value: 'all', label: 'All Materials' },
    { value: 'textbook', label: 'Textbooks' },
    { value: 'lab-manual', label: 'Lab Manuals' },
    { value: 'video', label: 'Video Lectures' },
    { value: 'study-guide', label: 'Study Guides' },
    { value: 'worksheet', label: 'Worksheets' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-700 text-blue-100">
      {/* Sidebar on the left */}
      <Usersidebar />

      {/* Main content area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">📚 Course Materials</h1>
          
          <button
            onClick={() => navigate("/userdashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
          
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white bg-opacity-10 text-blue-200 hover:bg-opacity-20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-blue-200 text-lg">Loading course materials...</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white bg-opacity-10 rounded-xl shadow-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105 border border-white border-opacity-20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{getCategoryIcon(material.category)}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(material.format)}`}>
                    {material.format}
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 text-blue-200">{material.title}</h2>
                <p className="text-blue-100 mb-4 text-sm">{material.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">Subject:</span>
                    <span className="text-blue-200 font-medium">{material.subject}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-300">Size:</span>
                    <span className="text-blue-200">{material.size}</span>
                  </div>
                </div>

                <button
                  onClick={() => downloadMaterial(material)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
                >
                  📥 Download
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Materials Statistics */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-semibold mb-4 text-blue-200">📊 Materials Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">{materials.length}</div>
              <div className="text-blue-200 text-sm">Total Materials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">
                {materials.filter(m => m.category === 'textbook').length}
              </div>
              <div className="text-blue-200 text-sm">Textbooks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">
                {materials.filter(m => m.category === 'video').length}
              </div>
              <div className="text-blue-200 text-sm">Video Lectures</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300 mb-2">
                {materials.filter(m => m.format === 'PDF').length}
              </div>
              <div className="text-blue-200 text-sm">PDF Documents</div>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6 border border-white border-opacity-20">
          <h3 className="text-xl font-semibold mb-4 text-blue-200">⚡ Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold text-blue-200">Recent Downloads</div>
              <div className="text-sm text-blue-300">Access your recently downloaded materials</div>
            </button>
            <button className="p-4 bg-green-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-semibold text-blue-200">Favorites</div>
              <div className="text-sm text-blue-300">View your bookmarked materials</div>
            </button>
            <button className="p-4 bg-purple-600 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition text-left">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-semibold text-blue-200">Search Materials</div>
              <div className="text-sm text-blue-300">Find specific course materials</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseMaterials;
