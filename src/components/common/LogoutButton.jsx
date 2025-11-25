import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      <span><TbLogout2 /></span>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;