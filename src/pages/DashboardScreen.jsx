import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { statsData, learningPath} from "../data.js";
import '../assets/styles/dashboard.css';
import profileImage from '../assets/profile-image.jpg';
import {
    BookOpenCheck,
    LockKeyhole,
    ChevronRight,
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
const API_URL = `${API_BASE}/api/users/admin/all`;

const DashboardScreen = () => {

  const { user } = useAuth();
  const [courseAccess, setCourseAccess] = useState({
    htmlAccess: user?.htmlAccess || false,
    jsAccess: user?.jsAccess || false,
    reactAccess: user?.reactAccess || false
  });

  useEffect(() => {
    // Initial setup from user object
    if (user) {
      setCourseAccess({
        htmlAccess: user.htmlAccess || false,
        jsAccess: user.jsAccess || false,
        reactAccess: user.reactAccess || false
      });
    }
  }, [user?.htmlAccess, user?.jsAccess, user?.reactAccess]);

  // Poll for access updates every 3 seconds
  useEffect(() => {
    if (!user || !user.token) return;

    const pollAccessUpdates = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        // Fetch all users to get current user's updated data
        const { data: allUsers } = await axios.get(API_URL, config);
        
        if (Array.isArray(allUsers)) {
          // Find current user in the list
          const currentUserData = allUsers.find(u => u._id === user._id);
          
          if (currentUserData) {
            setCourseAccess({
              htmlAccess: currentUserData.htmlAccess || false,
              jsAccess: currentUserData.jsAccess || false,
              reactAccess: currentUserData.reactAccess || false
            });
          }
        }
      } catch (err) {
        // Silent fail - don't spam errors
        console.debug('Polling for access updates failed (expected if endpoint unavailable)');
      }
    };

    // Poll immediately and then every 3 seconds
    pollAccessUpdates();
    const interval = setInterval(pollAccessUpdates, 3000);
    
    return () => clearInterval(interval);
  }, [user?.token, user?._id]);

  // Map stage to access permission
  const getAccessStatus = (stage) => {
    const accessMap = {
      'Beginner': courseAccess.htmlAccess,
      'Intermediate': courseAccess.jsAccess,
      'Advanced': courseAccess.reactAccess
    };
    return accessMap[stage] || false;
  };

  return (

        <section className="dashboard-content">
          <div className="content__greetings">
            <div className="greetings__profile-image">
              <img src={profileImage} alt="user profile" />
            </div>

            <div className="greetings__text">
              <h2 className="section-title">Welcome back, {user.firstName} 👋</h2>
              <p>{user.role}</p>

              {/* <h2 className="section-title">Welcome back, Mojeed 👋</h2>
              <p>student</p> */}
            </div>
          </div>

          <div className="dashboard__stats">
            {statsData.map(({title, figure, description, Icon}) => (
              <div key={title} className="stats__box">
                <div>
                  <p>{title}</p>
                  <h1>{figure}</h1>
                  <small>{description}</small>
                </div>
                
                <span><Icon/></span>
              </div>
            ))}
          </div>


          <div className="dashboard__others">
            <div className='dashboard__courses'>
              <div className='dashboard__learning-path'>
                <span><BookOpenCheck/></span>
                <h3>Your Learning Path</h3>
              </div>

              {learningPath.map(({Icon, stage, title, ...props}) => {
                const hasAccess = getAccessStatus(stage);
                return (
                <div key={stage} className={`dashboard__courses-box ${stage}`}>
                  <div className='dashboard__courses-left'>
                    <span><Icon/></span>
                  </div>

                  <div className='dashboard__courses-right'>
                    <div>
                      <p>{stage}</p>
                      {!hasAccess && <span className='dashboard__lock'><LockKeyhole size='14'/></span>}
                    </div>

                    <h3 className={!hasAccess ? 'dashboard__courses-title' : ''}>{title}</h3>

                    <p>{props.description}</p>

                    <span className="dashboard__back-icon"><Icon size={140}/></span>

                    <div>
                      <small>{props.module}</small>
                      {hasAccess ? 
                      <Link to={props.link}>Continue <span><ChevronRight size={15}/></span></Link> : 
                      <menu>Locked <span><LockKeyhole size={14}/></span></menu>}
                    </div>
                  </div>
                </div>
              );
              })}
            </div>

            <div className='dashboard__quiz'></div>
          </div>

        </section>
  );
};

export default DashboardScreen;