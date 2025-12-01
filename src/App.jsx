import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css'

// import DashboardScreen from './pages/DashboardScreen';

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

{/* Introduction pages */}
import WelcomeScreen from './pages/html-pages/WelcomeScreen';
import GeneralOverview from './pages/html-pages/GeneralOverview';
import WhyLearn from './pages/html-pages/WhyLearn';
import CourseOverview from './pages/html-pages/CourseOverview';
import CodeEditors from './pages/html-pages/CodeEditors';

{/* HTML pages */}
import HTMLTransition from './pages/html-pages/HTMLTransition';
import HTMLPageStructure from './pages/html-pages/HTMLPageStructure';
import ListTags from './pages/html-pages/ListTags';
import Tables from './pages/html-pages/Tables';
import Images from './pages/html-pages/Images';
import Hyperlinks from './pages/html-pages/Hyperlinks';
import InlineBlockElement from './pages/html-pages/InlineBlockElement';
import Forms from './pages/html-pages/Forms';
import HTMLStyling from './pages/html-pages/HTMLStyling';

{/* CSS pages */}
import CSSTransition from './pages/css-pages/CSSTransition';

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

              {/* Introduction pages */}
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/general-overview" element={<GeneralOverview />} />
              <Route path="/why" element={<WhyLearn />} />
              <Route path="/course-overview" element={<CourseOverview />} />
              <Route path="/editor" element={<CodeEditors />} />

              {/* HTML pages */}
              <Route path="/html-transition" element={<HTMLTransition />} />
              <Route path="/html-structure" element={<HTMLPageStructure />} />
              <Route path="/html-list" element={<ListTags />} />
              <Route path="/html-table" element={<Tables />} />
              <Route path="/html-image" element={<Images />} />
              <Route path="/html-hyperlinks" element={<Hyperlinks />} />
              <Route path="/html-block-element" element={<InlineBlockElement />} />
              <Route path="/html-form" element={<Forms />} />
              <Route path="/html-style" element={<HTMLStyling />} />

              {/* CSS pages */}
              <Route path="/css-transition" element={<CSSTransition />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFoundScreen />} />







          <Route element={<MainLayout />}>
            {/* <Route path="/courseOverview" element={<CourseOverview />} />
            <Route path="/htmlList" element={<ListTags />} /> */}
          </Route>
        </Routes>
        
        
      </div>
    </Router>
  )
}

export default App
