import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './logout-btn.css'

const LogoutButton = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="logout-btn"
    >
      Logout ({user.username})
    </button>
  );
};

export default LogoutButton;