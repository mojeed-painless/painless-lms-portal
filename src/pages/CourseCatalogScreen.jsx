// lms-react-app/src/pages/CourseCatalogScreen.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/courses/CourseCard';
import LogoutButton from '../components/common/LogoutButton';

const CourseCatalogScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
  const API_URL = `${API_BASE}/api/courses`;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // GET request to the public API endpoint we created
        const { data } = await axios.get(API_URL);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Run only once on mount

  return (
    <div className="main-layout"> 
      <header className="app-header">
        <h1 className="logo-text">Course Catalog</h1>
        <div className="user-controls">
          <LogoutButton /> 
        </div>
      </header>
      
      <main className="dashboard-content">
        <h2 className="section-title">Explore Courses</h2>
        
        {/* Loading and Error States */}
        {loading && 
                <div className="loading-overlay" aria-live="polite" aria-busy="true">
                  <div className="spinner" role="status" aria-label="Loading">
                    <div className="ring ring1" />
                    <div className="ring ring2" />
                    <div className="ring ring3" />
                    <div className="dots">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
        }
        {error && <div className="error-message">{error}</div>}
        {courses.length === 0 && !loading && !error && (
            <div className="empty-message">No courses available yet.</div>
        )}

        {/* Course Grid */}
        <div className="course-grid"> 
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default CourseCatalogScreen;