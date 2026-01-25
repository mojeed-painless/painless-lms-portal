import UnderDevelopment from "../components/common/UnderDevelopment";
import { useState } from 'react';
import '../assets/styles/quiz.css';
import {
  Sparkles,
  WandSparkles,
  Sparkle,
  Siren,
} from 'lucide-react';


export default function QuizScreen() {
  
const [isActive, setIsActive] = useState('daily quiz');

function handleActiveButton(title) {
  setIsActive(title);
}

  return (
      <UnderDevelopment section="Quiz" />

      // <div className="quiz__container">
      //   <div className="transcript__header">
      //     <div className="transcript__header-title">
      //       <h1><span><Sparkles size={25}/></span> Quiz Center</h1>
      //       <p className="transcript__header-subtitle">Challange others to climb up the leaderboard</p>
      //     </div>
          
      //     <div className="quiz__nav-btn">
      //       <button className={isActive === 'daily quiz' ? 'active-quiz' : ''} onClick={() => handleActiveButton('daily quiz')}><WandSparkles size={18} /> Daily Quiz</button>
      //       <button className={isActive === 'topic quiz' ? 'active-quiz' : ''} onClick={() => handleActiveButton('topic quiz')}><Sparkle size={18} /> Topic Quiz</button>
      //     </div>
      //   </div>

      //   {isActive === 'daily quiz' && 
        
      //   <div className="daily-quiz__container">
      //     <div className="quiz__countdown">
      //       <h2> <span><Siren/></span> Next Daily Quiz In:</h2>

      //       <div className="quiz__timer">
      //         <div className="quiz__time-box">
      //           <span>02</span>
      //           <small>Hours</small>
      //         </div>
      //         <div className="quiz__time-box">
      //           <span>15</span>
      //           <small>Minutes</small>
      //         </div>
      //         <div className="quiz__time-box">
      //           <span>42</span>
      //           <small>Seconds</small>
      //         </div>
      //       </div>

      //       <div className='scoring__rule'>
      //         <p> Scoring rule </p>

      //         <div>
      //           <span>1st: 5 pts</span>
      //           <span>2nd: 3 pts</span>
      //           <span>3rd: 2 pts</span>
      //           <span>others: 1 pt</span>
      //         </div>
      //       </div>
      //     </div>
      //   </div>}

      //   {isActive === 'topic quiz' && 
      //   <div className="topic-quiz__container">
      //     <h2>Topic Quiz</h2>
      //   </div>}

      // </div>

      
  );
}