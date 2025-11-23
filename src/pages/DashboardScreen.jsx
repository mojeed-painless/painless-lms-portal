// lms-react-app/src/pages/DashboardScreen.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/common/LogoutButton';
import { Link } from 'react-router-dom';

const DashboardScreen = () => {
  const { user } = useAuth();
  
  // Basic content for the dashboard
  return (
    <div className="main-layout"> 
      <header className="app-header">
        <h1 className="logo-text">LMS Dashboard</h1>
        <div className="user-controls">
          {/* Display user info and the Logout button */}
          <span className="user-greeting">Welcome, {user.username}! ({user.role})</span>
          <LogoutButton />
        </div>
      </header>
      
      <main className="dashboard-content">
        <h2 className="section-title">Your Learning Overview</h2>
        
        {/* Placeholder for Course Progress */}
        <div className="progress-card">
          <h3>My Courses</h3>
          <p>You have 0 courses enrolled. Start exploring the catalog!</p>
          
          <Link to="/catalog" className="not-found-link" >Go to Course Catalog</Link>
        </div>

        {/* Placeholder for Assignments/Quizzes */}
        <div className="progress-card">
          <h3>Upcoming Activities</h3>
          <p>No new assignments or quizzes.</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;