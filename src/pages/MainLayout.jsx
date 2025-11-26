import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/common/LogoutButton';
import { Outlet, Link } from 'react-router-dom';
import '../assets/styles/layout.css';
import pcalogo from '../assets/pcalogo.png';
import profileImage from '../assets/profile-image.jpg';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { MdOutlineMenuBook, MdOutlineAssignment } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { IoPodiumOutline, IoSettingsOutline } from "react-icons/io5";
import { CgTranscript } from "react-icons/cg";

const listTexts = [
  { id: 1, text: 'Home', icon: <FiHome  />, to: '/' },
  { id: 2, text: 'Course Contents', icon: <MdOutlineMenuBook />, to: '/content' },
  { id: 3, text: 'Assignments', icon: <MdOutlineAssignment />, to: '/assignments' },
  { id: 4, text: 'Quizzes', icon: <GiBrain />, to: '/quizzes' },
  { id: 5, text: 'Grades', icon: <IoPodiumOutline />, to: '/grades' },
  { id: 6, text: 'Transcript', icon: <CgTranscript />, to: '/transcript' },
  { id: 7, text: 'Settings', icon: <IoSettingsOutline />, to: '/settings' },
]



const MainLayout = () => {
  const { user } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHiden, setIsHiden] = useState(false);

  return (
    <div className="container">
      <nav>
        <div className="nav__left">
          {/* Works for WINDOWS screen only  */}
          <span className='collapse-btn large-collapse-btn' onClick={() => setIsCollapsed(prev => !prev)}>
            { isCollapsed ? 
                <TbLayoutSidebarRightCollapse /> : 
                <TbLayoutSidebarLeftCollapse />}
          </span>

          {/* Works for MOBILE screen only */}
          <span className='collapse-btn small-collapse-btn' onClick={() => setIsHiden(prev => !prev)}>
            { isHiden ? 
                <TbLayoutSidebarLeftCollapse /> : 
                <TbLayoutSidebarRightCollapse />}
          </span>

          <div className="nav-logo">
            <img src={pcalogo} alt="academy logo" />
          </div>
        </div>

        <div className="nav__right">
          <div className="nav__username">{user.firstName || "User"}</div>
          <div className="nav__user-image">
            <img src={profileImage} alt="user profile" />
          </div>
        </div>
      </nav>

      <main>
        <aside className={ isCollapsed ? 'collapsed-sidebar' : '' }>
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

        <aside className={ `small-screen__sidebar ${ isHiden ? 'show-sidebar' : '' } ` }>
         <div className="sidebar-header">
            <span className='collapse-btn' onClick={() => setIsHiden(prev => !prev)}>
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

        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;