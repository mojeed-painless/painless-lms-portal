import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// import LogoutButton from '../components/common/LogoutButton';
// import '../assets/styles/admin.css'; 

const API_URL = '/api/users/admin'; // Base API URL for admin routes

const AdminDashboardScreen = () => {
  const { user } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') return;
    setLoading(true);
    try {
      // 1. Fetch Pending Users
      const { data: pendingData } = await axios.get(`${API_URL}/pending`, config);
      setPendingUsers(pendingData);

      // 2. Fetch ALL Users
      const { data: allData } = await axios.get(`${API_URL}/all`, config);
      
      const approvedUsers = allData.filter(u => u.isApproved);
      const filteredUsers = approvedUsers.filter(u => u._id !== user._id);
      
      setAllUsers(filteredUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
        return;
    }
    
    setLoading(true);
    try {
        await axios.delete(`${API_URL}/${userId}`, config);
        fetchUsers(); 
        
    } catch (err) {
        console.error('Error deleting user:', err);
        setError(err.response?.data?.message || 'Failed to delete user.');
    } finally {
        setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, isApproved, newRole) => {
    setLoading(true);
    try {
      const body = { isApproved };
      if (newRole) {
        body.role = newRole;
      }
      
      await axios.put(`${API_URL}/${userId}`, body, config);
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
  
  // Component for rendering a single user card and buttons
  const UserCard = ({ userItem, isPending = false }) => (
    <div className="user-card">
      <div className="user-info">
        <p className="user-name">{userItem.username} (<span className="user-email">{userItem.email}</span>)</p>
        <p className={`user-role ${isPending ? 'pending-role' : 'approved-role'}`}>
          {isPending ? 'Requested Role: ' : 'Current Role: '} 
          <span className="role-value">{userItem.role}</span>
        </p>
      </div>

      <div className="button-group">
        {/* Approve Buttons (Only for Pending List) */}
        {isPending && (
          <>
            <button 
              className="btn btn-approve"
              onClick={() => handleUpdateUser(userItem._id, true, 'student')}
            >
              Approve as Student
            </button>
            
            {userItem.role === 'instructor' && (
                <button 
                  className="btn btn-approve-instructor"
                  onClick={() => handleUpdateUser(userItem._id, true, 'instructor')}
                >
                  Approve as Instructor
                </button>
            )}
          </>
        )}
        
        {/* Delete Button (For both lists) */}
        <button 
          className="btn btn-delete"
          onClick={() => handleDeleteUser(userItem._id)} 
        >
          Deny & Delete
        </button>
        
        {/* Role Change Button (Only for Approved List) */}
        {!isPending && (
            <select
                className="role-select"
                value={userItem.role}
                onChange={(e) => handleUpdateUser(userItem._id, true, e.target.value)}
            >
                <option value="student">Set Student</option>
                <option value="instructor">Set Instructor</option>
            </select>
        )}
      </div>
    </div>
  );


  return (
    <>
      <style>
        {`
          /* Base Styles */
          .admin-dashboard {
            padding: 24px;
            background-color: #f9fafb; /* gray-50 */
            min-height: 100vh;
            font-family: Arial, sans-serif;
          }

          .main-header {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 24px;
            color: #4338ca; /* indigo-700 */
            border-bottom: 2px solid #e5e7eb; /* gray-200 */
            padding-bottom: 8px;
          }

          .section-header {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #374151; /* gray-700 */
          }

          .loading-message {
            text-align: center;
            color: #6366f1; /* indigo-500 */
          }

          .error-alert {
            background-color: #fee2e2; /* red-100 */
            border: 1px solid #f87171; /* red-400 */
            color: #b91c1c; /* red-700 */
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 16px;
          }

          .user-list-container {
            margin-bottom: 32px;
          }

          .user-card {
            background-color: white;
            padding: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            border: 1px solid #e5e7eb; /* gray-200 */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
          }
          
          @media (min-width: 640px) { /* sm breakpoint */
            .user-card {
              flex-direction: row;
              align-items: center;
            }
          }
          
          .user-info {
            margin-bottom: 12px;
          }
          
          @media (min-width: 640px) { /* sm breakpoint */
            .user-info {
              margin-bottom: 0;
            }
          }

          .user-name {
            font-weight: bold;
            color: #1f2937; /* gray-800 */
          }

          .user-email {
            font-size: 14px;
            font-weight: normal;
            color: #4b5563; /* gray-600 */
          }

          .user-role {
            font-size: 14px;
            text-transform: capitalize;
          }

          .pending-role {
            color: #6366f1; /* indigo-500 */
          }

          .approved-role {
            color: #10b981; /* green-600 */
          }
          
          .role-value {
              font-weight: 600;
          }

          /* Buttons and Controls */
          .button-group {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }

          .btn {
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 8px;
            transition: background-color 0.2s;
            font-size: 14px;
            border: none;
            cursor: pointer;
          }

          .btn-approve {
            background-color: #10b981; /* green-500 */
            color: white;
          }
          .btn-approve:hover {
            background-color: #059669; /* green-600 */
          }
          
          .btn-approve-instructor {
            background-color: #3b82f6; /* blue-500 */
            color: white;
          }
          .btn-approve-instructor:hover {
            background-color: #2563eb; /* blue-600 */
          }

          .btn-delete {
            background-color: #ef4444; /* red-500 */
            color: white;
          }
          .btn-delete:hover {
            background-color: #dc2626; /* red-600 */
          }
          
          .role-select {
              padding: 8px;
              border: 1px solid #d1d5db; /* gray-300 */
              border-radius: 8px;
              font-size: 14px;
              background-color: white;
              cursor: pointer;
          }
        `}
      </style>
      <div className="admin-dashboard">
        <h1 className="main-header">Admin Dashboard</h1>

        {loading && <p className="loading-message">Loading...</p>}
        {error && <div className="error-alert" role="alert">{error}</div>}

        {/* --- PENDING USERS SECTION --- */}
        <div className="user-list-container">
          <h2 className="section-header">Pending User Approvals ({pendingUsers.length})</h2>

          {pendingUsers.length === 0 && !loading && (
            <p className="empty-message">No users currently pending approval. All clear!</p>
          )}

          <div className="space-y-4">
            {pendingUsers.map((userItem) => (
              <UserCard key={userItem._id} userItem={userItem} isPending={true} />
            ))}
          </div>
        </div>


        {/* --- APPROVED USERS SECTION --- */}
        <div>
          <h2 className="section-header">All Approved Users ({allUsers.length})</h2>

          {allUsers.length === 0 && !loading && (
            <p className="empty-message">No approved users found (excluding yourself).</p>
          )}

          <div className="space-y-4">
            {allUsers.map((userItem) => (
              <UserCard key={userItem._id} userItem={userItem} isPending={false} />
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default AdminDashboardScreen;