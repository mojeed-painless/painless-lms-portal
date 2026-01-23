import React from 'react';
import '../assets/styles/home.css';
import pcalogo from '../assets/pcalogo.png';

const HomeScreen = () => {
  return (
    <div className="home__container">
      <nav className="home__navbar">
        <div className="nav-logo">
            <img src={pcalogo} alt="academy logo" />
        </div>

        <div className="home__nav-auth">
          <button>Sign In</button>
          <button>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <span className="trust-badge">Trusted by 1,000+ developers</span>
          <h1>Master Frontend <br/>Development <span className="text-gradient">The Modern Way</span></h1>
          <p>From HTML basics to React mastery—learn through interactive projects, daily quizzes, and code reviews with mentor feedback.</p>
          <div className="hero-btns">
            <button className="btn-primary">Start Learning Free &gt;</button>
            <button className="btn-secondary">Sign In</button>
          </div>
          <div className="hero-features">
            <span>✓ No credit card required</span>
            <span>✓ Free for everyone</span>
          </div>
        </div>
        
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose DevLearn?</h2>
        <div className="features-grid">
          <div className="feat-card">
            <div className="feat-icon">{"</>"}</div>
            <h3>Hands-on coding</h3>
            <p>Practice with real-world scenarios and get instant feedback.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">⭐</div>
            <h3>Gamified Learning</h3>
            <p>Earn points, badges, and climb the leaderboard.</p>
          </div>
          <div className={/*  */ "feat-card"}>
            <div className="feat-icon">🏆</div>
            <h3>Community & Support</h3>
            <p>Compete with others and get expert help.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-bar">
        <div className="stat-item"><h3>10K+</h3><p>Active Students</p></div>
        <div className="stat-item"><h3>50+</h3><p>Courses</p></div>
        <div className="stat-item"><h3>1M+</h3><p>Quizzes Taken</p></div>
        <div className="stat-item"><h3>4.9</h3><p>Average Rating</p></div>
      </section>
    </div>
  );
};

export default HomeScreen;