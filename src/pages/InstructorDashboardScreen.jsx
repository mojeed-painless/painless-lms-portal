// lms-react-app/src/pages/InstructorDashboardScreen.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/common/LogoutButton';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
const API_URL = `${API_BASE}/api/courses`;


// Helper component to display a single row for course management
const CourseManagementRow = ({ course, onDelete }) => (
    <div className="management-row">
        <div className="course-row">
            <span className="course-row-title">{course.title}</span>
            <span className="course-row-status">{course.isPublished ? 'Published' : 'Draft'}</span>
        </div>
        <button 
            className="logout-btn" 
            onClick={() => onDelete(course._id)}
        >
            Delete
        </button>
    </div>
);


const InstructorDashboardScreen = () => {
    const { user } = useAuth();
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState({ title: '', description: '', category: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // --- 1. Fetch Instructor's Courses ---
    const fetchMyCourses = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                headers: {
                    // Crucial: Send JWT for protected route access
                    Authorization: `Bearer ${user.token}`, 
                },
            };
            // Note: We need a new backend endpoint to get courses by instructor, 
            // but for simplicity now, we'll fetch all and filter client-side 
            // or assume a future backend route: GET /api/courses/my
            
            // Assuming a future backend route for filtering by instructor:
            const { data } = await axios.get(`${API_URL}/management/my`, config); 
            
            setMyCourses(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch courses.');
            setLoading(false);
        }
    };

    useEffect(() => {
        // We only fetch if the user is logged in
        if (user && user.role === 'instructor') {
            // NOTE: Replace this with the final GET /api/courses/my endpoint later
            // For now, let's just use the public catalog call and filter (temporary)
            fetchMyCourses(); 
        }
    }, [user]);

    // --- 2. Create Course Handler ---
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
            // POST to the protected route /api/courses/management
            await axios.post(`${API_URL}/management`, formState, config);

            setSuccess('Course created successfully! (Currently in Draft)');
            setFormState({ title: '', description: '', category: '' }); // Clear form
            fetchMyCourses(); // Refresh list

        } catch (err) {
            setError(err.response?.data?.message || 'Error creating course.');
        }
    };

    // --- 3. Delete Course Handler ---
    const handleDeleteCourse = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }

        setError(null);
        setSuccess(null);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
            // DELETE to the protected route /api/courses/:id
            await axios.delete(`${API_URL}/${courseId}`, config);

            setSuccess('Course deleted successfully.');
            fetchMyCourses(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting course.');
        }
    };

    if (user.role !== 'instructor') {
        return (
            <div className="flex items-center justify-center h-screen text-2xl font-bold text-red-600">
                ACCESS DENIED: You must be an Instructor to view this page.
            </div>
        );
    }
    
    return (
        <div className="main-layout"> 
            <header className="app-header">
                <h1 className="logo-text">Instructor Dashboard</h1>
                <div className="user-controls">
                    <LogoutButton />
                </div>
            </header>
            
            <main className="dashboard-content">
                <h2 className="section-title">Manage Your Courses</h2>

                {/* Status Messages */}
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {/* --- A. Create New Course Form --- */}
                <div className="creation-card">
                    <h3>Create New Course</h3>
                    <form onSubmit={handleCreateCourse} className="creation-form">
                        <input
                            type="text"
                            placeholder="Course Title"
                            value={formState.title}
                            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                            required
                            className="form-input"
                        />
                         <input
                            type="text"
                            placeholder="Category (e.g., Programming)"
                            value={formState.category}
                            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                            required
                            className="form-input"
                        />
                        <textarea
                            placeholder="Course Description"
                            value={formState.description}
                            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                            required
                            rows="3"
                            className="form-input textarea"
                        ></textarea>
                        
                        <button type="submit" className="primary-btn">
                            Create Course
                        </button>
                    </form>
                </div>
                
                {/* --- B. Course List for Management --- */}
                <h2 className="section-title mt-8">Your Existing Courses</h2>
                
                {loading && <div className="loading-message">Loading your courses...</div>}
                {!loading && myCourses.length === 0 && (
                    <div className="empty-message">You have not created any courses yet.</div>
                )}
                
                <div className="course-list-management">
                    {myCourses.map(course => (
                        <CourseManagementRow 
                            key={course._id} 
                            course={course} 
                            onDelete={handleDeleteCourse} 
                        />
                    ))}
                </div>

            </main>
        </div>
    );
};

export default InstructorDashboardScreen;