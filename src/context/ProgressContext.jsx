import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users`;

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState(() => {
    // Load from localStorage as initial state
    const saved = localStorage.getItem(`progress_${user?._id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch progress from backend when user logs in
  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`${API_URL}/progress`, config);
        const serverProgress = data.completedLessons || [];
        
        // Use server data if available, otherwise keep localStorage data
        setCompletedLessons(serverProgress);
        // Update localStorage with server data
        localStorage.setItem(`progress_${user._id}`, JSON.stringify(serverProgress));
      } catch (err) {
        console.warn('Could not fetch progress from server:', err.message);
        // Fall back to localStorage if server fails
        const saved = localStorage.getItem(`progress_${user._id}`);
        if (saved) {
          setCompletedLessons(JSON.parse(saved));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user?._id, user?.token]);

  // Save to localStorage whenever completedLessons changes
  useEffect(() => {
    if (user?._id && !isLoading) {
      localStorage.setItem(`progress_${user._id}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, user?._id, isLoading]);

  // Mark a lesson as complete and sync with backend
  const markLessonComplete = async (lessonPath) => {
    // Optimistic update - update UI immediately
    setCompletedLessons(prev => {
      if (!prev.includes(lessonPath)) {
        return [...prev, lessonPath];
      }
      return prev;
    });

    // Sync with backend
    if (!user?._id || !user?.token) {
      console.warn('Cannot sync progress: user not authenticated');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `${API_URL}/progress`,
        { completedLessons: completedLessons },
        config
      );
    } catch (err) {
      console.error('Error syncing progress to backend:', err.message);
      // Progress is still saved locally, will sync on next login
    }
  };

  // Check if a lesson is completed
  const isLessonComplete = (lessonPath) => {
    return completedLessons.includes(lessonPath);
  };

  // Get total completed lessons count
  const getCompletedCount = () => {
    return completedLessons.length;
  };

  // Get completion percentage
  const getCompletionPercentage = (totalLessons) => {
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const value = {
    completedLessons,
    markLessonComplete,
    isLessonComplete,
    getCompletedCount,
    getCompletionPercentage,
    isLoading,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
