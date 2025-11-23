import { useAuth } from '../../context/AuthContext';
import DashboardScreen from '../../pages/DashboardScreen';
import InstructorDashboardScreen from '../../pages/InstructorDashboardScreen';
import AdminDashboardScreen from '../../pages/AdminDashboardScreen';

const RoleBasedDashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Redirecting...</div>; 
  }

  if (user.role === 'admin') {
    return <AdminDashboardScreen />;
  }

  if (user.role === 'instructor') {
    return <InstructorDashboardScreen />;
  }

  return <DashboardScreen />;
};

export default RoleBasedDashboard;