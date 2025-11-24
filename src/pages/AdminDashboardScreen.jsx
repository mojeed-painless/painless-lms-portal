import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/common/LogoutButton';
import ApprovedUserListItem from '../components/common/ApprovedUserListItem';
import '../assets/styles/admin.css'; 

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
const API_URL = `${API_BASE}/api/users/admin`;

const AdminDashboardScreen = () => {
    const { user } = useAuth();
    const [pendingUsers, setPendingUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
      setPendingUsers(pendingData);

      // 2. Fetch ALL Users
      const { data: allData } = await axios.get(`${API_URL}/all`, config);
      
      // Filter 'all' data to include only approved users (and exclude the logged-in admin)
      const approvedUsers = allData.filter(u => u.isApproved && u._id !== user._id);
      
      setAllUsers(approvedUsers);
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

    if (user.role !== 'admin') {
        return (
            <div className="error-state">
                ACCESS DENIED: You must be an Administrator to view this page.
            </div>
        );
    }
    
    return (
        <div className="main-layout"> 
            <header className="app-header">
                <h1 className="logo-text">Admin Center</h1>
                <div className="user-controls">
                    <LogoutButton /> 
                </div>
            </header>
            
            <main className="dashboard-content">
                <h2 className="section-title">Pending Account Approvals</h2>

                {error && <div className="error-message">{error}</div>}

                {loading && <div className="loading-message">Loading pending requests...</div>}
                
                {!loading && pendingUsers.length === 0 && (
                    <div className="empty-message">No accounts currently pending approval.</div>
                )}
                
                <div className="admin-grid">
                    {pendingUsers.map(userItem => (
                        <div key={userItem._id} className="pending-card">
                            <div className="user-info">
                                <h3>{userItem.username}</h3>
                                <p>Email: {userItem.email}</p>
                            </div>
                            <div className="role-request">
                                Requested Role: <span className={`role-tag role-${userItem.role}`}>
                                    {userItem.role.toUpperCase()}
                                </span>
                            </div>

                            <div className="approval-actions">
                                <button 
                                    className="primary-btn approve-btn"
                                    onClick={() => handleUpdateUser(userItem._id, true, userItem.role)}
                                >
                                    Approve as {userItem.role}
                                </button>
                                <button 
                                    className="primary-btn reject-btn"
                                    onClick={() => handleUpdateUser(userItem._id, true, 'student')}
                                >
                                    Approve as Student
                                </button>
                                <button 
                                    className="primary-btn delete-btn"
                                    onClick={() => handleDeleteUser(userItem._id)}
                                >
                                    Deny & Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <h2 className="section-title">All Approved Users ({allUsers.length})</h2>

                    {allUsers.length === 0 && !loading && (
                        <p className="empty-message">No approved users found (excluding yourself).</p>
                    )}

                    <ul className="approved-users-list">
                        {allUsers.map((userItem) => (
                        <ApprovedUserListItem 
                            key={userItem._id} 
                            userItem={userItem} 
                            handleUpdateUser={handleUpdateUser}
                            handleDeleteUser={handleDeleteUser}
                        />
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardScreen;