import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css'

// Placeholder Page Components (We'll build these soon)
import LoginScreen from './pages/LoginScreen'; 
import RegisterScreen from './pages/RegisterScreen';
import CourseCatalogScreen from './pages/CourseCatalogScreen';
import CoursePlayerScreen from './pages/CoursePlayerScreen';
import RoleBasedDashboard from './components/common/RoleBasedDashboard';
import NotFoundScreen from './pages/NotFoundScreen';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes: Accessible to everyone */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          
          {/* Private Routes: Require Authentication */}
          {/* We use the PrivateRoute component to wrap the protected pages */}
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<RoleBasedDashboard />} />
            <Route path="/catalog" element={<CourseCatalogScreen />} />
            <Route path="/course/:courseId" element={<CoursePlayerScreen />} />
          </Route>
          
          {/* Optional: Add a 404 Not Found Page */}
          <Route path="*" element={<NotFoundScreen />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
