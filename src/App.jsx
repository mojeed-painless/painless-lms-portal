import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css'

import MainLayout from './pages/MainLayout';
import LoginScreen from './pages/LoginScreen'; 
import RegisterScreen from './pages/RegisterScreen';
import CourseCatalogScreen from './pages/CourseCatalogScreen';
import CoursePlayerScreen from './pages/CoursePlayerScreen';
import RoleBasedDashboard from './components/common/RoleBasedDashboard';
import NotFoundScreen from './pages/NotFoundScreen';

import CourseContentScreen from './pages/CourseContentScreen';
import AssignmentScreen from './pages/AssignmentScreen';
import QuizScreen from './pages/QuizScreen';
import GradeScreen from './pages/GradeScreen';
import TranscriptScreen from './pages/TranscriptScreen';
import SettingsScreen from './pages/SettingsScreen';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<RoleBasedDashboard />} />
              <Route path="/catalog" element={<CourseCatalogScreen />} />
              <Route path="/course/:courseId" element={<CoursePlayerScreen />} />
              <Route path="/content" element={<CourseContentScreen />} />
              <Route path="/assignments" element={<AssignmentScreen />} />
              <Route path="/quizzes" element={<QuizScreen />} />
              <Route path="/grades" element={<GradeScreen />} />
              <Route path="/transcript" element={<TranscriptScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
        
        
      </div>
    </Router>
  )
}

export default App
