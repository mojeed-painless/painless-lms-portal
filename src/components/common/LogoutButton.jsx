import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/logout-btn.css';

const LogoutButton = () => {
  const { logout } = useAuth();
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
      Logout
    </button>
  );
};

export default LogoutButton;