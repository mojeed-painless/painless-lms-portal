import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem(`progress_${user?._id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever completedLessons changes
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`progress_${user._id}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, user?._id]);

  // Mark a lesson as complete
  const markLessonComplete = (lessonPath) => {
    setCompletedLessons(prev => {
      if (!prev.includes(lessonPath)) {
        return [...prev, lessonPath];
      }
      return prev;
    });
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
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
