import UnderDevelopment from "../components/common/UnderDevelopment";
import { useState, useEffect, useCallback } from 'react';
import '../assets/styles/quiz.css';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';
import { TbPointFilled } from "react-icons/tb";
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from "react-icons/tb";
import {
  Sparkles,
  WandSparkles,
  Sparkle,
  Siren,
  Trophy,
  TimerReset,
  BadgeInfo,
  CalendarDays,
  MoveRight,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';


export default function QuizScreen() {
  const { user } = useAuth();
  
  // ===== QUIZ STATES =====
  // Daily quiz questions for today
  const [todaysQuestions, setTodaysQuestions] = useState([]);
  
  // Quiz session states
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);
  
  // Leaderboard for today
  const [todaysLeaderboard, setTodaysLeaderboard] = useState([]);
  
  // Quiz Settings from Backend
  const [quizSettings, setQuizSettings] = useState({
    releaseTime: '16:15', // Default: 4:15 PM
    duration: 15 // Default: 15 minutes
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  
  // Previous quizzes history
  const [quizHistory, setQuizHistory] = useState([]);
  
  // UI States
  const [isActive, setIsActive] = useState('daily quiz');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isLiveQuiz, setIsLiveQuiz] = useState(false);
  const [expandedDate, setExpandedDate] = useState(null);
  const [quizSessionTime, setQuizSessionTime] = useState({ minutes: 2, seconds: 0 });
  const [successMessage, setSuccessMessage] = useState('');
  const [backendMessage, setBackendMessage] = useState('');
  
  // Admin form state
  const [formData, setFormData] = useState({
    question: '',
    image: null,
    imagePreview: null,
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
  });
  
  // Today's date for tracking
  const [today] = useState(new Date().toISOString().split('T')[0]);
  
  // Track if we're still initializing
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Track if user has already attempted today's quiz (one attempt per day)
  const [hasAttemptedToday, setHasAttemptedToday] = useState(false);
  // Fetch quiz settings from backend (primary source for cross-device sync)
  useEffect(() => {
    const loadQuizSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quizzes/settings`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setQuizSettings({
            releaseTime: data.releaseTime || '16:15',
            duration: data.duration || 15
          });
          // Also save to localStorage for offline support
          localStorage.setItem('quizReleaseTime', data.releaseTime || '16:15');
          localStorage.setItem('quizReleaseDuration', (data.duration || 15).toString());
          console.log('Quiz settings loaded from backend:', data);
        } else {
          // Fallback to localStorage if backend fails
          const localReleaseTime = localStorage.getItem('quizReleaseTime') || '16:15';
          const localDuration = localStorage.getItem('quizReleaseDuration') || '15';
          setQuizSettings({
            releaseTime: localReleaseTime,
            duration: parseInt(localDuration)
          });
          console.log('Backend unavailable, using localStorage:', { localReleaseTime, localDuration });
        }
      } catch (err) {
        console.warn('Could not fetch quiz settings from backend, using localStorage:', err.message);
        // Fallback to localStorage if backend is unreachable
        const localReleaseTime = localStorage.getItem('quizReleaseTime') || '16:15';
        const localDuration = localStorage.getItem('quizReleaseDuration') || '15';
        setQuizSettings({
          releaseTime: localReleaseTime,
          duration: parseInt(localDuration)
        });
      } finally {
        setLoadingSettings(false);
      }
    };

    // Load settings on mount
    loadQuizSettings();

    // Poll backend every 30 seconds to sync across devices
    const pollInterval = setInterval(() => {
      loadQuizSettings();
    }, 30000);

    // Listen for storage changes (from admin dashboard in same tab)
    const handleStorageChange = () => {
      const updatedReleaseTime = localStorage.getItem('quizReleaseTime');
      const updatedDuration = localStorage.getItem('quizReleaseDuration');
      
      if (updatedReleaseTime && updatedDuration) {
        setQuizSettings({
          releaseTime: updatedReleaseTime,
          duration: parseInt(updatedDuration)
        });
        console.log('Quiz settings updated from storage event');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, []);

  // Helper to resolve a real user id (Mongo ObjectId) to send to backend
  const resolveUserId = async () => {
    if (user?._id || user?.id) return user._id || user.id;
    // Try to fetch authoritative profile from backend
    try {
      const resp = await fetch(`${API_BASE_URL}/api/users/me`, { credentials: 'include' });
      if (resp.ok) {
        const data = await resp.json();
        return data._id || data.id || null;
      }
    } catch (err) {
      // ignore
    }
    return null;
  };

  // ===== LOCALSTORAGE EFFECTS =====
  // Load questions from backend on mount (primary source) - only if authenticated
  useEffect(() => {

    if (!user?.id && !user?._id) {
      // User not logged in yet, just load from localStorage
      const storageKey = `quiz_questions_${today}`;
      const savedQuestions = localStorage.getItem(storageKey);
      if (savedQuestions) {
        try {
          const parsed = JSON.parse(savedQuestions);
          console.log('Loaded questions from localStorage (not authenticated):', parsed);
          setTodaysQuestions(parsed);
        } catch (error) {
          console.error('Error parsing localStorage:', error);
        }
      }
      setIsInitialized(true);
      return;
    }

    const loadQuestionsFromBackend = async () => {
      try {
        const todayDate = new Date().toISOString().split('T')[0];
        // resolve best available user id
        const resolvedId = await resolveUserId();
        const headers = {};
        if (resolvedId) {
          headers['X-User-ID'] = resolvedId;
          console.log('Loading questions with user ID:', resolvedId);
        } else {
          console.log('No resolved user id; attempting unauthenticated fetch');
        }

        const response = await fetch(`${API_ENDPOINTS.QUIZ.GET_QUESTIONS}?date=${todayDate}`, {
          headers,
          credentials: 'include'
        });

        if (response.ok) {
          const questions = await response.json();
          console.log('Loaded questions from backend:', questions);
          setTodaysQuestions(questions);
          setBackendMessage('');
          setIsInitialized(true);
          return;
        }
      } catch (error) {
        // Backend not available
      }
      
      // Backend unavailable or unauthenticated - show message but still load from localStorage
      setBackendMessage('⚠️ Backend unavailable or unauthenticated. Using local storage. Questions will sync once backend is online or you log in.');
      
      // Fallback: Load from localStorage
      const storageKey = `quiz_questions_${today}`;
      const savedQuestions = localStorage.getItem(storageKey);
      if (savedQuestions) {
        try {
          const parsed = JSON.parse(savedQuestions);
          console.log('Loaded questions from localStorage:', parsed);
          setTodaysQuestions(parsed);
        } catch (error) {
          console.error('Error parsing localStorage:', error);
        }
      }
      setIsInitialized(true);
    };
    
    loadQuestionsFromBackend();
  }, [user, today]); // Run when user or date changes

  // Save questions to localStorage as backup
  useEffect(() => {
    // Skip saving during initialization
    if (!isInitialized) {
      return;
    }
    
    const storageKey = `quiz_questions_${today}`;
    localStorage.setItem(storageKey, JSON.stringify(todaysQuestions));
  }, [todaysQuestions, today, isInitialized]);

  // Load and check if user has already attempted today's quiz from backend
  useEffect(() => {
    const checkAttemptStatus = async () => {
      // Only check if user is logged in
      if (!user?.id && !user?._id) {
        // Not logged in yet, skip
        setIsInitialized(true);
        return;
      }

      try {
        const userId = user._id || user.id;
        const response = await fetch(
          `${API_BASE_URL}/api/quizzes/daily/check-attempt?userId=${userId}&date=${today}`,
          { credentials: 'include' }
        );
        
        if (response.ok) {
          const data = await response.json();
          setHasAttemptedToday(data.hasAttempted || false);
          console.log('Quiz attempt status from backend:', data.hasAttempted);
        } else {
          // If backend endpoint doesn't exist yet, fall back to localStorage
          const attemptKey = `quiz_attempted_${today}`;
          const hasAttempted = localStorage.getItem(attemptKey) === 'true';
          setHasAttemptedToday(hasAttempted);
          console.log('Using localStorage for quiz attempt status:', hasAttempted);
        }
      } catch (error) {
        // If backend call fails, try localStorage as fallback
        console.warn('Failed to check attempt status from backend:', error);
        const attemptKey = `quiz_attempted_${today}`;
        const hasAttempted = localStorage.getItem(attemptKey) === 'true';
        setHasAttemptedToday(hasAttempted);
      }
    };

    checkAttemptStatus();
  }, [user, today]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ===== QUIZ SUBMISSION HANDLERS =====
  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.question || !formData.optionA || !formData.optionB || !formData.optionC || !formData.optionD) {
      alert('Please fill in all required fields');
      return;
    }

    // Create question object
    const newQuestion = {
      id: Date.now(),
      date: today,
      question: formData.question,
      image: formData.imagePreview,
      options: {
        A: formData.optionA,
        B: formData.optionB,
        C: formData.optionC,
        D: formData.optionD,
      },
      correctAnswer: formData.correctAnswer,
    };

    // Add to today's questions (frontend state)
    setTodaysQuestions(prev => [...prev, newQuestion]);
    
    // Send to backend API
    const sendToBackend = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
        };

        // Resolve authoritative user id if possible
        try {
          const resolved = await resolveUserId();
          if (resolved) headers['X-User-ID'] = resolved;
        } catch (err) {
          // ignore
        }

        const response = await fetch(API_ENDPOINTS.QUIZ.ADD_QUESTION, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            question: formData.question,
            image: formData.imagePreview,
            options: {
              A: formData.optionA,
              B: formData.optionB,
              C: formData.optionC,
              D: formData.optionD,
            },
            correctAnswer: formData.correctAnswer,
            date: today,
          }),
        });

        if (!response.ok) {
          console.error('Failed to save question to backend');
        }
      } catch (error) {
        console.error('Error sending question to backend:', error);
      }
    };
    
    sendToBackend();
    
    // Show success message
    setSuccessMessage('Question added successfully! ✓');
    setTimeout(() => setSuccessMessage(''), 3000);

    // Reset form
    setFormData({
      question: '',
      image: null,
      imagePreview: null,
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
    });

    // TODO: Send to backend API
    // API Call: POST /api/quizzes/daily/add-question
    // Backend should store question with today's date
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setTodaysQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };

  // ===== QUIZ SESSION HANDLERS =====
  const handleStartQuiz = () => {
    if (hasAttemptedToday) {
      alert('You have already completed today\'s quiz. Come back tomorrow for a new one!');
      return;
    }
    
    if (todaysQuestions.length === 0) {
      alert('No questions available for today\'s quiz yet. Check back later!');
      return;
    }
    
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setQuizResponses({});
    setQuizStartTime(new Date());
    setQuizSessionTime({ minutes: 2, seconds: 0 });
  };

  const handleSelectOption = (optionKey) => {
    setQuizResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: optionKey
    }));
  };

  const isLastQuestion = currentQuestionIndex === todaysQuestions.length - 1;

  const handleNextQuestion = () => {
    if (currentQuestionIndex < todaysQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = useCallback(() => {
    let correctCount = 0;
    
    Object.keys(quizResponses).forEach(questionIndex => {
      const question = todaysQuestions[parseInt(questionIndex)];
      if (question && quizResponses[questionIndex] === question.correctAnswer) {
        correctCount++;
      }
    });

    return {
      correctAnswers: correctCount,
      totalQuestions: todaysQuestions.length,
      percentage: Math.round((correctCount / todaysQuestions.length) * 100)
    };
  }, [quizResponses, todaysQuestions]);

  const updateLeaderboard = useCallback((submission) => {
    // This is a frontend simulation
    // Backend should handle actual ranking after 2-minute window closes
    setTodaysLeaderboard(prev => {
      const updated = [submission, ...prev];
      // Sort by score (desc) then by time taken (asc)
      return updated.sort((a, b) => {
        if (b.correctAnswers !== a.correctAnswers) {
          return b.correctAnswers - a.correctAnswers;
        }
        return a.timeTaken - b.timeTaken;
      }).slice(0, 3); // Keep top 3
    });
  }, []);

  const handleFinishQuiz = useCallback(async () => {
    if (!quizStartTime) return;

    const endTime = new Date();
    const timeTaken = Math.round((endTime - quizStartTime) / 1000); // in seconds
    const score = calculateScore();

    // Resolve authoritative student id if possible
    let studentId = user?.id;
    try {
      const resolved = await resolveUserId();
      if (resolved) studentId = resolved;
    } catch (err) {
      // ignore
    }

    // Create quiz submission
    const quizSubmission = {
      id: Date.now(),
      date: today,
      studentId: studentId,
      studentName: user?.name,
      correctAnswers: score.correctAnswers,
      totalQuestions: score.totalQuestions,
      timeTaken: timeTaken,
      submittedAt: endTime,
      responses: { ...quizResponses }
    };

    // Save to quiz history (previous quizzes)
    setQuizHistory(prev => [quizSubmission, ...prev]);

    // Simulate leaderboard update (backend should calculate this)
    updateLeaderboard(quizSubmission);

    // Mark that user has completed today's quiz (one attempt per day) - on backend
    try {
      const submitResponse = await fetch(`${API_BASE_URL}/api/quizzes/daily/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(quizSubmission)
      });
      
      if (submitResponse.ok) {
        const submitData = await submitResponse.json();
        console.log('Quiz submitted to backend successfully:', submitData);
        setBackendMessage(submitData.message || 'Quiz submitted successfully!');
      } else {
        console.warn('Backend quiz submission failed, using localStorage fallback');
        // Fallback: save to localStorage
        const attemptKey = `quiz_attempted_${today}`;
        localStorage.setItem(attemptKey, 'true');
      }
    } catch (error) {
      console.error('Error submitting quiz to backend:', error);
      // Fallback: save to localStorage
      const attemptKey = `quiz_attempted_${today}`;
      localStorage.setItem(attemptKey, 'true');
    }
    
    setHasAttemptedToday(true);

    // End quiz session
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setQuizResponses({});
    
    // Show success message
    setSuccessMessage(`Quiz completed! You scored ${score.correctAnswers}/${score.totalQuestions}. Time taken: ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`);
    setTimeout(() => setSuccessMessage(''), 5000);
  }, [quizStartTime, calculateScore, updateLeaderboard, quizResponses, user?.id, user?.name, today, resolveUserId]);

  const calculatePointsForRank = (rank, correctAnswers) => {
    const bonusPoints = {
      1: 5,
      2: 3,
      3: 1,
    };
    return (bonusPoints[rank] || 0) + correctAnswers;
  };

  const handleDateClick = (dateIndex) => {
    setExpandedDate(expandedDate === dateIndex ? null : dateIndex);
  };

  // ===== COUNTDOWN TIMERS =====
  // 1. Countdown to configurable quiz release time
  // 2. Countdown during quiz session
  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get quiz settings from backend/state
      const releaseTimeStr = quizSettings.releaseTime || '16:15'; // Default: 4:15 PM
      const durationMinutes = quizSettings.duration || 15; // Default: 15 minutes
      
      // Parse time string (HH:MM format)
      const [releaseHours, releaseMinutes] = releaseTimeStr.split(':').map(Number);
      
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // Calculate quiz end time (release time + duration)
      const quizStartHours = releaseHours;
      const quizStartMinutes = releaseMinutes;
      let quizEndHours = releaseHours;
      let quizEndMinutes = releaseMinutes + durationMinutes;
      
      // Handle minutes overflow
      if (quizEndMinutes >= 60) {
        quizEndHours += Math.floor(quizEndMinutes / 60);
        quizEndMinutes = quizEndMinutes % 60;
      }
      // Handle hours overflow
      if (quizEndHours >= 24) {
        quizEndHours = quizEndHours % 24;
      }

      // Check if current time is within quiz window
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const quizStartInMinutes = quizStartHours * 60 + quizStartMinutes;
      const quizEndInMinutes = quizEndHours * 60 + quizEndMinutes;
      
      const isInLiveWindow = quizEndInMinutes > quizStartInMinutes 
        ? (currentTimeInMinutes >= quizStartInMinutes && currentTimeInMinutes < quizEndInMinutes)
        : (currentTimeInMinutes >= quizStartInMinutes || currentTimeInMinutes < quizEndInMinutes);
      
      if (isInLiveWindow) {
        setIsLiveQuiz(true);
        const quizEndTime = new Date(now);
        quizEndTime.setHours(quizEndHours, quizEndMinutes, 0, 0);
        
        // If end time has already passed today, it means it wrapped to tomorrow
        if (quizEndTime < now && quizEndInMinutes < quizStartInMinutes) {
          quizEndTime.setDate(quizEndTime.getDate() + 1);
        }
        
        const difference = quizEndTime - now;
        
        if (difference > 0) {
          setTimeLeft({
            hours: 0,
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          // Quiz time ended
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          setIsLiveQuiz(false);
        }
      } else {
        setIsLiveQuiz(false);
        const targetTime = new Date(now);
        targetTime.setHours(releaseHours, releaseMinutes, 0, 0);

        // If it's already past the release time, set target to tomorrow's release time
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
  }, [quizSettings]);

  // Quiz session countdown (2 minutes)
  useEffect(() => {
    if (!quizStarted) return;

    const quizTimer = setInterval(() => {
      setQuizSessionTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Time's up - finish quiz automatically
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [quizStarted]);

  // Handle quiz timeout
  useEffect(() => {
    if (quizStarted && quizSessionTime.minutes === 0 && quizSessionTime.seconds === 0) {
      handleFinishQuiz();
    }
  }, [quizSessionTime, quizStarted, handleFinishQuiz]);

  // Handle when live quiz window ends (8:02 PM)
  useEffect(() => {
    if (quizStarted && !isLiveQuiz) {
      // Live window has ended, auto-finish the quiz
      handleFinishQuiz();
    }
  }, [isLiveQuiz, handleFinishQuiz, quizStarted]);

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div className="quiz__container">
      <div className="transcript__header">
        <div className="transcript__header-title">
          <h1><span><Sparkles size={25}/></span> Quiz Center</h1>
          <p className="transcript__header-subtitle">Challenge others to climb up the leaderboard</p>
        </div>
        
        <div className="quiz__nav-btn">
          <button 
            className={isActive === 'daily quiz' ? 'active-quiz' : ''} 
            onClick={() => setIsActive('daily quiz')}
          >
            <WandSparkles size={18} /> Daily Quiz
          </button>
          <button 
            className={isActive === 'topic quiz' ? 'active-quiz' : ''} 
            onClick={() => setIsActive('topic quiz')}
          >
            <Sparkle size={18} /> Topic Quiz
          </button>
          {user?.role === 'admin' && (
            <button 
              className={isActive === 'admin' ? 'active-quiz' : ''} 
              onClick={() => setIsActive('admin')}
            >
              <Plus size={18} /> Add Question
            </button>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="success-banner" style={{
          padding: '12px 20px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          {successMessage}
        </div>
      )}

      {backendMessage && (
        <div className="warning-banner" style={{
          padding: '12px 20px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #ffeeba'
        }}>
          {backendMessage}
        </div>
      )}

      {isActive === 'daily quiz' && 
      <div className="daily-quiz__container">
        
        {/* QUIZ READY (ACTIVE QUIZ SESSION) */}
        {quizStarted && (
          <div className="quiz__ready">
            <div className="quiz-session__container">
              <div className="quiz-session__header">
                <div className="quiz-session__question-number">
                  <span>Question {currentQuestionIndex + 1} of {todaysQuestions.length}</span>
                </div>

                <div className="quiz-session__timer" style={{
                  color: quizSessionTime.minutes === 0 && quizSessionTime.seconds <= 30 ? '#ff4444' : '#333'
                }}>
                  <span><TimerReset /></span>
                  <span className="quiz-session__time">
                    {formatTime(quizSessionTime.minutes)}:{formatTime(quizSessionTime.seconds)}
                  </span>
                </div>
              </div>

              {todaysQuestions[currentQuestionIndex] && (
                <>
                  {todaysQuestions[currentQuestionIndex].image && (
                    <div className="quiz-session__image">
                      <img src={todaysQuestions[currentQuestionIndex].image} alt="question" />
                    </div>
                  )}

                  <div className="quiz-session__question">
                    <h3>{todaysQuestions[currentQuestionIndex].question}</h3>
                  </div>

                  <div className="quiz-session__options">
                    {Object.entries(todaysQuestions[currentQuestionIndex].options).map(([key, value]) => (
                      <button 
                        key={key}
                        className={`quiz-option ${quizResponses[currentQuestionIndex] === key ? 'selected' : ''}`}
                        onClick={() => handleSelectOption(key)}
                      >
                        <span className="option-circle">{key}</span>
                        <span className="option-content">{value}</span>
                      </button>
                    ))}
                  </div>

                  <div className="quiz-session__navigation" style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '24px'
                  }}>
                    <button 
                      className="quiz-session__btn"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
                    >
                      ← Previous
                    </button>
                    
                    {isLastQuestion ? (
                      <button 
                        className="quiz-session__submit-btn"
                        onClick={handleFinishQuiz}
                      >
                        Finish Quiz <span><CheckCircle size={16} /></span>
                      </button>
                    ) : (
                      <button 
                        className="quiz-session__submit-btn"
                        onClick={handleNextQuestion}
                      >
                        Next Question <span><MoveRight size={16} /></span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* QUIZ COUNTDOWN AND CONTROLS */}
        {!quizStarted && (
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
                    <span><i><TbPointFilled/></i>1st:   <small>5 pts + correct answers</small></span>
                    <span><i><TbPointFilled/></i>2nd:   <small>3 pts + correct answers</small></span>
                    <span><i><TbPointFilled/></i>3rd:   <small>1 pt + correct answers</small></span>
                    <span><i><TbPointFilled/></i>others:   <small>0 pts + correct answers</small></span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2><span className="siren-blink live-text">LIVE</span> Quiz is on now!</h2>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  {todaysQuestions.length} question{todaysQuestions.length !== 1 ? 's' : ''} available • 2 minutes to complete
                </p>

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

                {hasAttemptedToday ? (
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#e8f5e9',
                    color: '#2e7d32',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginTop: '20px',
                    border: '2px solid #4caf50'
                  }}>
                    <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>✓ Quiz Completed</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>You've already completed today's quiz. Come back tomorrow for a new one!</p>
                  </div>
                ) : (
                  <button 
                    className="quiz__start-btn" 
                    onClick={handleStartQuiz}
                  >
                    Start Quiz
                  </button>
                )}
              </>
            )}
          </div>
        )}

        <div className="quiz__article">
          {/* LEADERBOARD */}
          <div className="quiz__leader">
            <div className="quiz__leader-header">
                <h4><span><Trophy size={20}/></span>Today's Top 3</h4>
                <small className="quiz__date">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</small>
            </div>

            <button>View Leaderboard</button>

            <div className="quiz__leader-list">
              {todaysLeaderboard.length > 0 ? (
                todaysLeaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const totalPoints = calculatePointsForRank(rank, entry.correctAnswers);
                  const rankIcon = rank === 1 ? <TbHexagonNumber1Filled/> : rank === 2 ? <TbHexagonNumber2Filled/> : <TbHexagonNumber3Filled/>;
                  const timeStr = `${Math.floor(entry.timeTaken / 60)}m ${entry.timeTaken % 60}s`;
                  
                  return (
                    <div key={entry.id} className="quiz__leader-item">
                      <span className="quiz__leader-rank">{rankIcon}</span>
                      <div className="quiz__leader-info">
                        <h5>{entry.studentName || 'Student'}</h5>
                        <small>Score: {entry.correctAnswers}/{entry.totalQuestions} • Points: {totalPoints}</small>
                      </div>
                      <small className="quiz__time"><span><TimerReset size={15}/></span> {timeStr}</small>
                    </div>
                  );
                })
              ) : (
                <div style={{ 
                  padding: '20px', 
                  textAlign: 'center', 
                  color: '#999',
                  fontSize: '14px'
                }}>
                  No submissions yet. Be the first to complete the quiz!
                </div>
              )}
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="quiz__instruction">
            <h4><span><BadgeInfo/></span>How it works</h4>
            <ol>
              <li>The Daily Quiz goes live every day at {quizSettings.releaseTime} and lasts for {quizSettings.duration} minutes.</li>
              <li>When the quiz is live, click on the "Start Quiz" button to begin.</li>
              <li>Answer all questions before the timer expires.</li>
              <li>Your score is based on correct answers and submission time.</li>
              <li>Top 3 performers get bonus points (5/3/1 pts).</li>
              <li>Check the leaderboard to see your ranking!</li>
            </ol>
          </div>
        </div>

        {/* PREVIOUS QUIZZES */}
        <div className="quiz__previous">
          <h3><span><WandSparkles/></span>Previous Quizzes</h3>
          
          <div className="quiz__previous-dates">
            {quizHistory.length > 0 ? (
              quizHistory.map((submission, historyIndex) => (
                <div 
                  key={submission.id} 
                  className={`quiz__date-item ${expandedDate === historyIndex ? 'active' : ''}`}
                >
                  <button 
                    className="quiz__date-btn" 
                    onClick={() => handleDateClick(historyIndex)}
                  >
                    <span><CalendarDays/></span>
                    <span className="date-label">
                      {new Date(submission.submittedAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="quiz__score-badge">
                      {submission.correctAnswers}/{submission.totalQuestions}
                    </span>
                  </button>

                  {expandedDate === historyIndex && (
                    <div className="quiz__date-content">
                      {todaysQuestions.map((question, qIndex) => {
                        const userAnswer = submission.responses[qIndex];
                        const isCorrect = userAnswer === question.correctAnswer;
                        
                        return (
                          <div key={question.id} className="quiz__question-item">
                            <div className="question-header">
                              <h4><small>Question {qIndex + 1}:</small></h4>
                              <span className={`status-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                              </span>
                            </div>

                            <div className="quiz-question">
                              {question.question}
                            </div>

                            {question.image && (
                              <div style={{ margin: '12px 0' }}>
                                <img src={question.image} alt="question" style={{ maxWidth: '100%', borderRadius: '4px' }} />
                              </div>
                            )}

                            <div className="answer-section">
                              {Object.entries(question.options).map(([key, text]) => {
                                const isUserAnswer = userAnswer === key;
                                const isCorrectAnswer = key === question.correctAnswer;
                                let className = 'option';
                                
                                if (isCorrectAnswer) className += ' correct-answer';
                                if (isUserAnswer && !isCorrect) className += ' incorrect-answer';
                                
                                return (
                                  <div key={key} className={className}>
                                    <span className="option-letter">{key}</span>
                                    <span className="option-text">{text}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                color: '#999',
                fontSize: '14px'
              }}>
                No previous quizzes yet. Complete your first quiz!
              </div>
            )}
          </div>
        </div>
      </div>}

      {isActive === 'topic quiz' && 
      <div className="topic-quiz__container">
        <UnderDevelopment section="Topic Quiz" />
      </div>}

      {isActive === 'admin' && user?.role === 'admin' && (
        <div className="admin-form__container">
          <div className="admin-form__header">
            <h2><Plus size={28} /> Add New Daily Quiz Question</h2>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
              Questions added here will be available for today's quiz at {quizSettings.releaseTime} ({todaysQuestions.length} question{todaysQuestions.length !== 1 ? 's' : ''} added so far)
            </p>
          </div>

          <form onSubmit={handleSubmitQuestion} className="admin-form">
            <div className="form-group">
              <label htmlFor="question">Question *</label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleFormChange}
                placeholder="Enter the quiz question..."
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Question Image (Optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              <p className="file-info">Supported formats: JPG, PNG, GIF, WebP</p>
              {formData.imagePreview && (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="optionA">Option A *</label>
                <input
                  type="text"
                  id="optionA"
                  name="optionA"
                  value={formData.optionA}
                  onChange={handleFormChange}
                  placeholder="Enter option A..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="optionB">Option B *</label>
                <input
                  type="text"
                  id="optionB"
                  name="optionB"
                  value={formData.optionB}
                  onChange={handleFormChange}
                  placeholder="Enter option B..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="optionC">Option C *</label>
                <input
                  type="text"
                  id="optionC"
                  name="optionC"
                  value={formData.optionC}
                  onChange={handleFormChange}
                  placeholder="Enter option C..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="optionD">Option D *</label>
                <input
                  type="text"
                  id="optionD"
                  name="optionD"
                  value={formData.optionD}
                  onChange={handleFormChange}
                  placeholder="Enter option D..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer *</label>
              <select
                id="correctAnswer"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleFormChange}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="form-btn submit-btn">Add Question</button>
              <button type="button" className="form-btn cancel-btn" onClick={() => setIsActive('daily quiz')}>Back to Quiz</button>
            </div>
          </form>

          {todaysQuestions.length > 0 && (
            <div style={{
              marginTop: '32px',
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '16px' }}>📋 Today's Questions Preview</h3>
              {todaysQuestions.map((q, index) => (
                <div key={q.id} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: 'white',
                  borderLeft: '4px solid #4CAF50',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <p><strong>Q{index + 1}:</strong> {q.question}</p>
                    <small style={{ color: '#666' }}>Correct Answer: {q.correctAnswer}</small>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    style={{
                      padding: '6px 12px',
                      marginLeft: '12px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <X size={14} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}