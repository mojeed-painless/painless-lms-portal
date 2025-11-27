import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../assets/styles/dashboard.css';
import profileImage from '../assets/profile-image.jpg';



const DashboardScreen = () => {

  const { user } = useAuth();

  return (

        <section className="dashboard-content">
          <div className="content__greetings">
            <div className="greetings__profile-image">
              <img src={profileImage} alt="user profile" />
            </div>

            <div className="greetings__text">
              <h2 className="section-title">Welcome back, {user.firstName}</h2>
              <p>{user.role}</p>

              {/* <h2 className="section-title">Welcome back, Mojeed</h2>
              <p>student</p> */}
            </div>
          </div>
          
          <Link to="/catalog" className="not-found-link" >Go to Course Catalog</Link>
        </section>
  );
};

export default DashboardScreen;