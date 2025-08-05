import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Award from './pages/Award'
import Nav from './pages/component/Nav'
import About from './pages/About'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Loginuser'
import Signupuser from './pages/Signupuser'
import Workout from './pages/component/user/workout'
import UserList from './pages/component/user/userlist'
import Adminsidebar from './pages/component/sidebar/adminsidebar'
import Userslidebar from './pages/component/sidebar/usersidebar'
import UserDashboard from './pages/component/dashboard/user'
import AdminDashboard from './pages/component/dashboard/admin'
import ProgressTracker from './pages/yoga/Useryoga'
import StudyTimer from './pages/cardio/usercardio'
import CourseMaterials from './pages/weight/Userweight'
import AdminYoga from './pages/yoga/Adminyoga'
import AdminCardio from './pages/cardio/Admincardio'
import AdminWeight from './pages/weight/Adminweight'
import AdminAnnouncement from './pages/Announcements/Adminannouncement'
import Achievements from './pages/Announcements/userannouncement'
import UserRequest from './pages/component/user/UserRequest'
import AdminRequest from './pages/component/admin/AdminRequest'
import TaskManager from './pages/food/Userfoodorder'
import StudySchedule from './pages/food/Usertablebooking'
import Adminfood from './pages/food/Adminfood'
import Admintables from './pages/food/Admintables'
import { ProtectedRoute, AdminProtectedRoute, UserProtectedRoute } from './components/protected'

const App = () => {
  return (
    <Router>
      <Toaster/>
      {/* <Nav/> */}
      <Routes>
        {/* Public Routes */}
        <Route path='' element={<Homepage></Homepage>} />
        <Route path='/about' element={<About></About>} />
        <Route path='/award' element={<Award></Award>} />
        <Route path='/loginuser' element={<Login></Login>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/signupuser' element={<Signupuser></Signupuser>}/>
        
        {/* Protected Routes - Any authenticated user */}
        <Route path='/workout' element={
          <ProtectedRoute>
            <Workout></Workout>
          </ProtectedRoute>
        }/> 
        <Route path='/UserList' element={
          <ProtectedRoute>
            <UserList></UserList>
          </ProtectedRoute>
        }/>
        <Route path='/userannouncement' element={
          <ProtectedRoute>
            <Achievements></Achievements>
          </ProtectedRoute>
        }/>
        
        {/* User-Only Protected Routes */}
        <Route path='/userdashboard' element={
          <UserProtectedRoute>
            <UserDashboard></UserDashboard>
          </UserProtectedRoute>
        }/>
        <Route path='/useryoga' element={
          <UserProtectedRoute>
            <ProgressTracker></ProgressTracker>
          </UserProtectedRoute>
        }/>
        <Route path='/usercardio' element={
          <UserProtectedRoute>
            <StudyTimer></StudyTimer>
          </UserProtectedRoute>
        }/>
        <Route path='/userweight' element={
          <UserProtectedRoute>
            <CourseMaterials></CourseMaterials>
          </UserProtectedRoute>
        }/>
        <Route path='/userrequest' element={
          <UserProtectedRoute>
            <UserRequest></UserRequest>
          </UserProtectedRoute>
        }/>
        <Route path='/taskmanager' element={
          <UserProtectedRoute>
            <TaskManager></TaskManager>
          </UserProtectedRoute>
        }/>
        <Route path='/studyschedule' element={
          <UserProtectedRoute>
            <StudySchedule></StudySchedule>
          </UserProtectedRoute>
        }/>
        
        {/* Admin-Only Protected Routes */}
        <Route path='/adminsidebar' element={
          <AdminProtectedRoute>
            <Adminsidebar></Adminsidebar>
          </AdminProtectedRoute>
        }/>
        <Route path='/usersidebar' element={
          <AdminProtectedRoute>
            <Userslidebar></Userslidebar>
          </AdminProtectedRoute>
        }/>
        <Route path='/adminyoga' element={
          <AdminProtectedRoute>
            <AdminYoga></AdminYoga>
          </AdminProtectedRoute>
        }/>
        <Route path='/admincardio' element={
          <AdminProtectedRoute>
            <AdminCardio></AdminCardio>
          </AdminProtectedRoute>
        }/>
        <Route path='/admindashboard' element={
          <AdminProtectedRoute>
            <AdminDashboard></AdminDashboard>
          </AdminProtectedRoute>
        }/>
        <Route path='/adminweight' element={
          <AdminProtectedRoute>
            <AdminWeight></AdminWeight>
          </AdminProtectedRoute>
        }/>
        <Route path='/adminannouncement' element={
          <AdminProtectedRoute>
            <AdminAnnouncement></AdminAnnouncement>
          </AdminProtectedRoute>
        }/>
        <Route path='/adminrequest' element={
          <AdminProtectedRoute>
            <AdminRequest></AdminRequest>
          </AdminProtectedRoute>
        }/>
        <Route path='/coursemanagement' element={
          <AdminProtectedRoute>
            <Adminfood></Adminfood>
          </AdminProtectedRoute>
        }/>
        <Route path='/schedulemanagement' element={
          <AdminProtectedRoute>
            <Admintables></Admintables>
          </AdminProtectedRoute>
        }/>
      </Routes>
      
    </Router>
  )
}

export default App










// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
