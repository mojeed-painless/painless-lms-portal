import React from 'react';
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
  
  return (
    <div className="container">
      <nav>
        <div className="nav__left">
          {/* <TbLayoutSidebarRightCollapse /> */}
          <TbLayoutSidebarLeftCollapse className='collapse-btn'/>
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
        <aside>
         { listTexts.map(item => (
            <Link to={item.to} key={item.id} className="sidebar__links">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </Link>
          ))}
          <LogoutButton className="dashboard__logout-btn"/>
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