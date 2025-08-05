import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import { createUserApi } from '../api/api';

const Signupuser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !age || !password || !address) {
      setError('All fields are required');
      toast.error("Please fill all fields");
      return;
    }
    setError('');
    try {
      const formData = new FormData();
      formData.append('username', name);
      formData.append('email', email);
      formData.append('age', age);
      formData.append('password', password);
      formData.append('address', address);

      const response = await createUserApi(formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = '/loginuser';
        }, 1500);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-amber-300">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-amber-300 mb-2"></h1>
          <h2 className="text-2xl font-semibold text-amber-200">Join Our Family</h2>
          <p className="text-amber-300 text-sm mt-2">Create your account to start dining</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Age</label>
            <input
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              min="1"
              max="120"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm bg-red-900 bg-opacity-30 p-2 rounded">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold text-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-amber-200 mt-6">
          Already have an account?{' '}
          <Link to="/loginuser" className="text-amber-300 hover:text-amber-100 underline font-semibold">Sign In</Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold"
          >
            🏠 Back to Homepage
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-amber-300">
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signupuser;



// import React, { useState } from 'react';
// import { Link } from 'react-router'; 
// import toast from 'react-hot-toast';
// import { createUserApi } from '../api/api';

// const Signupuser = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !email || !password) {
//       setError('All fields are required');
//       toast.error("Please fill all fields");
//       return;
//     }
//     setError('');
//     try {
//       const formData = new FormData();
//       formData.append('username', name);
//       formData.append('email', email);
//       formData.append('password', password);

//       const response = await createUserApi(formData);

//       if (response.data.success) {
//         toast.success(response.data.message);
//         setTimeout(() => {
//           window.location.href = '/loginuser';
//         }, 1500);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-purple-900 to-black px-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               placeholder="Utkrista Paudel"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               placeholder="Paudel888@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>
//           {error && <p className="text-red-600 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//           >
//             Create Account
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-4">
//           Already have an account?{' '}
//           <Link to="/loginuser" className="text-purple-600 hover:underline">Login</Link>
//         </p>

//         <div className="mt-6 text-center">
//           <Link
//             to="/"
//             className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-900 transition"
//           >
//             Go to Homepage
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signupuser;




// // import React from 'react';
// // import { Link } from 'react-router';

// // const Signupuser = () => {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-purple-900 to-black px-4">
// //       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
// //         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
// //         <form className="space-y-5">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Full Name</label>
// //             <input
// //               type="text"
// //               placeholder="Utkrista Paudel"
// //               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Email</label>
// //             <input
// //               type="email"
// //               placeholder="Paudel888@gmail.com"
// //               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Password</label>
// //             <input
// //               type="password"
// //               placeholder="••••••••"
// //               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
// //           >
// //             Create Account
// //           </button>
// //         </form>

// //         <p className="text-sm text-center text-gray-600 mt-4">
// //           Already have an account?{' '}
// //           <Link to="/loginuser" className="text-purple-600 hover:underline">Login</Link>
// //         </p>

// //         {/* Go to Homepage Button */}
// //         <div className="mt-6 text-center">
// //           <Link
// //             to="/"
// //             className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-900 transition"
// //           >
// //             Go to Homepage
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signupuser;