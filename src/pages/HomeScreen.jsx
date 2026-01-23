import React from 'react';
import '../assets/styles/home.css';
import pcalogo from '../assets/pcalogo.png';
import { Link } from 'react-router-dom';
import { homeFeatures } from '../data.js';
import {
    MoveRight,
    CircleCheckBig,
    Star,
} from 'lucide-react'

const HomeScreen = () => {
  return (
    <div className="home__container">
      <nav className="home__navbar">
        <div className="nav-logo">
            <img src={pcalogo} alt="academy logo" />
        </div>

        <div className="home__nav-auth">
          <Link to='/login'>Sign in</Link>
          <Link to='/register' className='home__btn'>Get Started</Link>
        </div>
      </nav>

    <section className="home__hero">        
        
        <div className="back-circle">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div className="home__hero-content">
            <span className="home__trust-badge">
                <i><Star size={18}/></i>
                Trusted by 500+ students
            </span>

            <h1>Master Frontend <br/>Development <span className="text-gradient">The Modern Way</span></h1>
          
            <p>From HTML basics to React mastery — learn through interactive projects, daily quizzes, and code reviews with mentor feedback.</p>
          
            <Link to='/register'>
                Start Learning
                <span><MoveRight size={20} /></span>
            </Link>
          
            <div className="home__hero-features">
                <span><i><CircleCheckBig size={18}/></i> Free introductory content</span>
                <span><i><CircleCheckBig size={18}/></i> Flexible learning schedule</span>
            </div>
        </div>
    </section>

      
    <section className="home__features">
      <div className="home__features-content">
        <h2>Why Choose Painless Code Academy?</h2>

        <div className="home__features-grid">
          {homeFeatures.map(({Icon, title, description}) => (
            <div key={title} className="home__feat-card">
              <div className="home__feat-icon">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
        
    </section>

      
      {/* <section className="stats-bar">
        <div className="stat-item"><h3>10K+</h3><p>Active Students</p></div>
        <div className="stat-item"><h3>50+</h3><p>Courses</p></div>
        <div className="stat-item"><h3>1M+</h3><p>Quizzes Taken</p></div>
        <div className="stat-item"><h3>4.9</h3><p>Average Rating</p></div>
      </section> */}
    </div>
  );
};

export default HomeScreen;