import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/common/LogoutButton';
import { Link } from 'react-router-dom';
import '../assets/styles/dashboard.css';
import pcalogo from '../assets/pcalogo.png';
import profileImage from '../assets/profile-image.jpg';
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { IoPodiumOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CgTranscript } from "react-icons/cg";

const listTexts = [
  { id: 1, text: 'Home', icon: <FiHome  />, to: '/dashboard' },
  { id: 2, text: 'Course Contents', icon: <MdOutlineMenuBook />, to: '/courses' },
  { id: 3, text: 'Assignments', icon: <MdOutlineAssignment />, to: '/assignments' },
  { id: 4, text: 'Quizzes', icon: <GiBrain />, to: '/quizzes' },
  { id: 5, text: 'Grades', icon: <IoPodiumOutline />, to: '/grades' },
  { id: 6, text: 'Transcript', icon: <CgTranscript />, to: '/transcript' },
  { id: 7, text: 'Settings', icon: <IoSettingsOutline />, to: '/settings' },
]



const DashboardScreen = () => {
  const { user } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHiden, setIsHiden] = useState(true);

  function toggleSidebar() {
    setIsCollapsed(prevState => !prevState);
  }

  function toggleSmallScreenSidebar() {
    setIsHiden(prevState => !prevState);
  }

  return (
    <div className="container">
      <nav>
        <div className="nav__left">
          {/* Works for WINDOWS screen only  */}
          <span className='collapse-btn large-collapse-btn' onClick={toggleSidebar}>
            { isCollapsed ? 
                <TbLayoutSidebarRightCollapse /> : 
                <TbLayoutSidebarLeftCollapse />}
          </span>

          {/* Works for MOBILE screen only */}
          <span className='collapse-btn small-collapse-btn' onClick={toggleSmallScreenSidebar}>
            { isHiden ? 
                <TbLayoutSidebarLeftCollapse /> : 
                <TbLayoutSidebarRightCollapse />}
          </span>

          <div className="nav-logo">
            <img src={pcalogo} alt="academy logo" />
          </div>
        </div>

        <div className="nav__right">
          <div className="nav__username">{user.firstName}</div>
          <div className="nav__user-image">
            <img src={profileImage} alt="user profile" />
          </div>
        </div>
      </nav>

      <main>
        <aside className={ isCollapsed && 'collapsed-sidebar' }>
         {(listTexts.map(item => (
            <Link to={item.to} key={item.id} className="sidebar__links">
              <span>{item.icon}</span>
              {!isCollapsed && <span>{item.text}</span>}
            </Link>
          )))}
          <LogoutButton 
            className="dashboard__logout-btn" 
            isCollapsed={isCollapsed}
          />
        </aside>

        {/* for MOBILE screen */}

        <aside className={ `small-screen__sidebar ${ isHiden && 'show-sidebar' } ` }>
         <div className="sidebar-header">
            <span className='collapse-btn' onClick={toggleSmallScreenSidebar}>
              { isHiden ? 
                  <TbLayoutSidebarLeftCollapse /> : 
                  <TbLayoutSidebarRightCollapse />}
            </span>
            <div className="nav-logo">
              <img src={pcalogo} alt="academy logo" />
            </div>
         </div>

         <div className='sidebar-body'>
            {(listTexts.map(item => (
              <Link to={item.to} key={item.id} className="sidebar__links">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            )))}
            <LogoutButton 
              className="dashboard__logout-btn"
            />
          </div>
        </aside>

        <section className="dashboard-content">
          <div className="content__greetings">
            <div className="greetings__profile-image">
              <img src={profileImage} alt="user profile" />
            </div>

            <div className="greetings__text">
              <h2 className="section-title">Welcome back, {user.firstName}</h2>
              <p>{user.role}</p>
            </div>
          </div>
          
          <Link to="/catalog" className="not-found-link" >Go to Course Catalog</Link>
        </section>
      </main>

    </div>
  );
};

export default DashboardScreen;