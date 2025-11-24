import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../components/common/LogoutButton';
import '../assets/styles/admin.css'; 

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';
const API_URL = `${API_BASE}/api/users/admin`;

const AdminDashboardScreen = () => {
    const { user } = useAuth();
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching ---
    const fetchPendingUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            // GET /api/users/admin/pending
            const { data } = await axios.get(`${API_URL}/pending`, config); 
            setPendingUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch pending users.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchPendingUsers();
        }
    }, [user]);
    
    const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
    // --- Action Handler: Approve/Reject/Change Role ---
    const handleUpdateUser = async (userId, isApproved, newRole) => {
        setError(null);
        
        try {

            
            // PUT /api/users/admin/:id
            const body = {};
            if (isApproved !== undefined) {
                body.isApproved = isApproved;
            }
            if (newRole) { // Only send role if it's explicitly set (e.g., 'student' or 'instructor')
                body.role = newRole;
            }
            await axios.put(`${API_URL}/${userId}`, body, config);

            // Refetch or update state immediately
            fetchPendingUsers(); 

        } catch (err) {
            setError(err.response?.data?.message || 'Error updating user status.');
        }
    };

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
        fetchPendingUsers(); 
        
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
            </main>
        </div>
    );
};

export default AdminDashboardScreen;