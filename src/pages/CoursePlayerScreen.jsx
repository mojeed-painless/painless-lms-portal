// lms-react-app/src/pages/CoursePlayerScreen.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../components/common/LogoutButton';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
const API_URL = `${API_BASE}/api/courses`;

const CoursePlayerScreen = () => {
    const { courseId } = useParams(); // Get courseId from URL (e.g., /course/123)
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API_URL}/${courseId}`);
                
                setCourse(data.course);
                setLessons(data.lessons);

                // Set the first lesson as the default current lesson
                if (data.lessons.length > 0) {
                    setCurrentLesson(data.lessons[0]);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load course details.');
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseData();
        }
    }, [courseId]);

    // --- Loading and Error States ---
    if (loading) {
        return <div className="loading-state">Loading Course...</div>;
    }

    if (error) {
        return <div className="error-state">{error}</div>;
    }
    
    // Ensure course exists before rendering
    if (!course) {
        return <div className="empty-state">Course data is missing.</div>;
    }


    // --- Lesson Content Renderer (Placeholder) ---
    const renderContent = () => {
        if (!currentLesson) {
            return <div>Select a lesson from the sidebar to begin.</div>;
        }

        // Display basic lesson information based on type
        return (
            <div className="content-viewer">
                <h2 className="lesson-title">{currentLesson.title}</h2>
                <div className="lesson-type-tag">Type: {currentLesson.type.toUpperCase()}</div>
                
                {/* Placeholder for video or document player */}
                <div className="lesson-media-placeholder">
                    {currentLesson.type === 'video' ? (
                        <p>Video Player Placeholder for: {currentLesson.contentUrl || 'No URL Provided'}</p>
                    ) : (
                        <p>Document/Quiz Placeholder for: {currentLesson.contentUrl || 'No Content'}</p>
                    )}
                </div>
                
                <div className="lesson-controls">
                    <button className="secondary-btn" disabled>
                        Previous Lesson
                    </button>
                    <button className="primary-btn">
                        Mark as Complete
                    </button>
                    <button className="secondary-btn" disabled>
                        Next Lesson
                    </button>
                </div>
            </div>
        );
    };

    // --- Main Player Layout ---
    return (
        <div className="player-layout">
            <header className="player-header">
                <h1 className="logo-text">{course.title}</h1>
                <div className="player-actions">
                    <LogoutButton />
                </div>
            </header>
            
            <div className="player-main-content">
                
                {/* A. Lesson Sidebar */}
                <aside className="lesson-sidebar">
                    <h3 className="sidebar-title">Course Content</h3>
                    <nav className="lesson-list">
                        {lessons.map((lesson) => (
                            <div
                                key={lesson._id}
                                className={`lesson-item ${currentLesson?._id === lesson._id ? 'active' : ''}`}
                                onClick={() => setCurrentLesson(lesson)}
                            >
                                <span className="lesson-index">{lesson.orderIndex + 1}.</span>
                                <span className="lesson-name">{lesson.title}</span>
                                {/* Icon placeholder for completion status */}
                                <span className="lesson-status">✓</span> 
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* B. Content Viewer */}
                <main className="content-area">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default CoursePlayerScreen;