import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/admin.css'; 
import { adminStats } from '../data.js';
import {
    History,
    UserRoundCheck,
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
const API_URL = `${API_BASE}/api/users/admin`;



const AdminDashboardScreen = () => {
    const { user } = useAuth();
    const [pendingUsers, setPendingUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseAccess, setCourseAccess] = useState({});

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
            
    // --- Data Fetching ---
  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') return;
    setLoading(true);
    try {
      // 1. Fetch Pending Users
      const { data: pendingData } = await axios.get(`${API_URL}/pending`, config);
      setPendingUsers(Array.isArray(pendingData) ? pendingData : []);

      // 2. Fetch ALL Users
      const { data: allData } = await axios.get(`${API_URL}/all`, config);
      
      // Filter 'all' data to include only approved users (and exclude the logged-in admin)
      const approvedUsers = Array.isArray(allData) 
        ? allData.filter(u => u.isApproved && u._id !== user._id)
        : [];
      
      setAllUsers(approvedUsers);

      // Load course access state from users data
      const access = {};
      approvedUsers.forEach(u => {
        access[`${u._id}-html`] = u.htmlAccess || false;
        access[`${u._id}-js`] = u.jsAccess || false;
        access[`${u._id}-react`] = u.reactAccess || false;
      });
      setCourseAccess(access);

      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

    // --- Action Handler: Approve/Reject/Change Role ---
  const handleUpdateUser = async (userId, isApproved, newRole) => {
    setLoading(true);
    try {
      const body = { isApproved };
      if (newRole) {
        body.role = newRole;
      }
      
      await axios.put(`${API_URL}/${userId}`, body, config);
      
      // Refresh both lists after update (user moves from pending to all)
      fetchUsers();
      
    } catch (err) {
      console.error('Error updating user status:', err);
      setError(err.response?.data?.message || 'Failed to update user status.');
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

const handleDeleteUser = async (userId) => {
    // IMPORTANT: Replacing window.confirm() with a custom modal is required in production environments.
    if (!window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
        return;
    }
    
    setLoading(true);
    try {
        // Send a DELETE request to /api/users/admin/:id
        await axios.delete(`${API_URL}/${userId}`, config);
        
        // Refresh the list immediately to remove the deleted user from the UI
        fetchUsers(); 
        
    } catch (err) {
        console.error('Error deleting user:', err);
        setError(err.response?.data?.message || 'Failed to delete user.');
    } finally {
        setLoading(false);
    }
  };

  const handleCourseAccessChange = async (userId, courseName, isChecked) => {
    try {
      // Update local state
      const key = `${userId}-${courseName}`;
      setCourseAccess(prev => ({
        ...prev,
        [key]: isChecked
      }));

      // Map course names to backend field names
      const fieldMap = {
        'html': 'htmlAccess',
        'js': 'jsAccess',
        'react': 'reactAccess'
      };

      // Send to backend
      await axios.put(`${API_URL}/${userId}`, {
        [fieldMap[courseName]]: isChecked
      }, config);

    } catch (err) {
      console.error(`Error updating ${courseName} access:`, err);
      setError(err.response?.data?.message || `Failed to update ${courseName} access.`);
      // Revert on error
      setCourseAccess(prev => ({
        ...prev,
        [`${userId}-${courseName}`]: !isChecked
      }));
    }
  };

    if (user.role !== 'admin') {
        return (
            <div className="error-state">
                ACCESS DENIED: You must be an Administrator to view this page.
            </div>
        );
    }

    const totalUsers = allUsers.length + pendingUsers.length;
    const PendingStudents = pendingUsers.length;
    const ApprovedStudents = allUsers.length;

    return (
       

    <div className="admin-container">
      {/* 1. Statistics Cards */}
      <div className="stats-grid">
        {adminStats.map(({title, value, Icon, color}) => (
            <div key={title} className="stat-card">
                <div>
                    <p className="stat-label">{title}</p>
                    <h2 className="stat-value">
                        {title === 'Total Users' && totalUsers}
                        {title === 'Pending Approval' && PendingStudents}
                        {title === 'Approved Users' && ApprovedStudents}
                        {title === 'Course Enrollments' && value}
                    </h2>
                </div>
                <div className={`stat-icon ${color}`}><Icon/></div>
            </div>
        ))} 
      </div>

      {/* 2. Pending Approvals Section */}
      <section className="section-container">
        <h3 className="section-title">
            <span> <History size={20}/> </span>
            <span> Pending Approvals </span>
            <span className="admin-badge">{PendingStudents}</span>
        </h3>

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading-message">Loading pending requests...</div>}
                
        {!loading && pendingUsers.length === 0 && (
            <div className="empty-message">No accounts currently pending approval.</div>
        )}

        <div className="pending-grid">
          {pendingUsers.map(userItem => (
            <div key={userItem._id} className="pending-card">
              <div className="card-header">
                <div className="user-info">
                  <h4>{userItem.username}</h4>
                  <p>{userItem.email}</p>
                  <small>Registered: Jan 10, 2024</small>
                </div>
                <div className="action-btns">
                  <button className="btn-reject" onClick={() => handleDeleteUser(userItem._id)}>✕</button>
                  <button className="btn-approve" onClick={() => handleUpdateUser(userItem._id, true, userItem.role)}>✓</button>
                </div>
              </div>
              <div className="card-tags">
                  <span  className={`tag html`}>
                    HTML
                  </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Approved Users Table */}
      <section className="section-container">
        <h3 className="section-title">
            <span className='green-color'><UserRoundCheck size={20}/></span> 
            <span>Approved Users</span> 
            <span className="admin-badge green-bg">{ApprovedStudents}</span>
        </h3>

        {allUsers.length === 0 && !loading && (
            <p className="empty-message">No approved users found (excluding yourself).</p>
        )}

        <div className="admin__table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Registered</th>
                <th>HTML</th>
                <th>Advanced JavaScript</th>
                <th>React</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(userItem => (
                <tr key={userItem.id}>
                  <td>
                    <div className="table-user">
                      <div className="user-avatar small">MS</div>
                      <div>
                        <strong>{userItem.firstname} {userItem.lastname}</strong>
                        <small>{userItem.email}</small>
                      </div>
                    </div>
                  </td>
                  <td><small>{userItem.role}</small></td>
                  <td><small>Jan 10, 2024</small></td>
                  <td>
                    <input 
                      type="checkbox" 
                      name='html'
                      checked={courseAccess[`${userItem._id}-html`] || false}
                      onChange={(e) => handleCourseAccessChange(userItem._id, 'html', e.target.checked)}
                      title={courseAccess[`${userItem._id}-html`] ? 'User has access' : 'User has no access'}
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      name='js'
                      checked={courseAccess[`${userItem._id}-js`] || false}
                      onChange={(e) => handleCourseAccessChange(userItem._id, 'js', e.target.checked)}
                      title={courseAccess[`${userItem._id}-js`] ? 'User has access' : 'User has no access'}
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox" 
                      name='react'
                      checked={courseAccess[`${userItem._id}-react`] || false}
                      onChange={(e) => handleCourseAccessChange(userItem._id, 'react', e.target.checked)}
                      title={courseAccess[`${userItem._id}-react`] ? 'User has access' : 'User has no access'}
                    />
                  </td>
                  <td><button className="btn-delete" onClick={() => handleDeleteUser(userItem._id)} >🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
    );
};

export default AdminDashboardScreen;