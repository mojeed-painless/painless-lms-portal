import UnderDevelopment from "../components/common/UnderDevelopment";
import { useState, useEffect } from 'react';
import '../assets/styles/quiz.css';
import { TbPointFilled } from "react-icons/tb";
import {
  Sparkles,
  WandSparkles,
  Sparkle,
  Siren,
} from 'lucide-react';


export default function QuizScreen() {
  
const [isActive, setIsActive] = useState('daily quiz');
const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
const [isLiveQuiz, setIsLiveQuiz] = useState(false);

useEffect(() => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    // Check if it's between 8pm (20:00) and 8:02pm (20:02)
    const isInLiveWindow = currentHours === 20 && currentMinutes < 2;
    
    if (isInLiveWindow) {
      // Show 2-minute countdown for the quiz
      setIsLiveQuiz(true);
      const quizEndTime = new Date(now);
      quizEndTime.setHours(20, 2, 0, 0); // 8:02 PM
      
      const difference = quizEndTime - now;
      
      if (difference > 0) {
        setTimeLeft({
          hours: 0,
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        setIsLiveQuiz(false);
      }
    } else {
      // Show countdown to next 8pm
      setIsLiveQuiz(false);
      const targetTime = new Date(now);
      targetTime.setHours(20, 0, 0, 0); // 8pm (20:00)

      // If it's already past 8pm, set target to tomorrow's 8pm
      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }
  };

  calculateTimeLeft();
  const timer = setInterval(calculateTimeLeft, 1000);

  return () => clearInterval(timer);
}, []);

function handleActiveButton(title) {
  setIsActive(title);
}

function handleOpenQuiz() {
  alert('Quiz opened! Start attempting now.');
  // Add actual quiz logic here
}

// Format numbers with leading zero
const formatTime = (num) => String(num).padStart(2, '0');

  return (
      

      <div className="quiz__container">
        <div className="transcript__header">
          <div className="transcript__header-title">
            <h1><span><Sparkles size={25}/></span> Quiz Center</h1>
            <p className="transcript__header-subtitle">Challange others to climb up the leaderboard</p>
          </div>
          
          <div className="quiz__nav-btn">
            <button className={isActive === 'daily quiz' ? 'active-quiz' : ''} onClick={() => handleActiveButton('daily quiz')}><WandSparkles size={18} /> Daily Quiz</button>
            <button className={isActive === 'topic quiz' ? 'active-quiz' : ''} onClick={() => handleActiveButton('topic quiz')}><Sparkle size={18} /> Topic Quiz</button>
          </div>
        </div>

        {isActive === 'daily quiz' && 
        
        <div className="daily-quiz__container">
          

          <div className="quiz__countdown">
            <div className="quiz__back">
              <div></div>
              <div></div>
              <div></div>
            </div>

            {!isLiveQuiz ? (
              <>
                <h2> <span className="siren-blink"><Siren size={25}/></span> Next Daily Quiz In:</h2>

                <div className="quiz__timer">
                  <div className="quiz__time-box">
                    <span>{formatTime(timeLeft.hours)}</span>
                    <small>Hours</small>
                  </div>
                  <div className="quiz__time-box">
                    <span>{formatTime(timeLeft.minutes)}</span>
                    <small>Minutes</small>
                  </div>
                  <div className="quiz__time-box">
                    <span>{formatTime(timeLeft.seconds)}</span>
                    <small>Seconds</small>
                  </div>
                </div>

                <div className='scoring__rule'>
                  <p> Scoring rule: </p>

                  <div>
                    <span><i><TbPointFilled/></i>1st:   <small>5 pts</small></span>
                    <span><i><TbPointFilled/></i>2nd:   <small>3 pts</small></span>
                    <span><i><TbPointFilled/></i>3rd:   <small>2 pts</small></span>
                    <span><i><TbPointFilled/></i>others:   <small>1 pt</small></span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2><span className="siren-blink live-text">LIVE</span> Daily Quiz is on now!</h2>

                <div className="quiz__timer">
                  <div className="quiz__time-box live-time-box">
                    <span>{formatTime(timeLeft.minutes)}</span>
                    <small>Minutes</small>
                  </div>
                  <div className="quiz__time-box live-time-box">
                    <span>{formatTime(timeLeft.seconds)}</span>
                    <small>Seconds</small>
                  </div>
                </div>

                <button className="quiz__start-btn" onClick={handleOpenQuiz}>
                  Start Quiz Now
                </button>
              </>
            )}
          </div>
        </div>}

        {isActive === 'topic quiz' && 
        <div className="topic-quiz__container">
          <UnderDevelopment section="Topic Quiz" />
        </div>}

      </div>

      
  );
}