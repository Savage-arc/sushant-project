import React from 'react';

const workouts = [
  {
    id: 1,
    title: 'Full Body Blast',
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    category: 'Strength',
    duration: '45 min',
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    title: 'Morning Yoga Flow',
    image: 'https://images.vecteezy.com/photo/8017057/asian-woman-practicing-yoga-indoor-with-easy-and-simple-position-to-control-breathing-in-and-meditation-pose',
    category: 'Yoga',
    duration: '30 min',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    title: 'HIIT Cardio Burn',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    category: 'Cardio',
    duration: '20 min',
    difficulty: 'Advanced',
  },
];

const Workout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-12 px-5 text-white font-sans">
      <h1 className="text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
        🏋️ Workout Programs
      </h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transform transition duration-300 hover:scale-105"
          >
            <img
              src={workout.image}
              alt={workout.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-bold mb-2 text-white">{workout.title}</h2>
              <p className="text-gray-300 mb-1">
                Category: <span className="text-indigo-300">{workout.category}</span>
              </p>
              <p className="text-gray-300 mb-1">
                Duration: <span className="text-indigo-300">{workout.duration}</span>
              </p>
              <p className="text-gray-300">
                Difficulty: <span className="text-indigo-300">{workout.difficulty}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
