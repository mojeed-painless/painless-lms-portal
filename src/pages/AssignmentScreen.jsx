import UnderDevelopment from "../components/common/UnderDevelopment";
import '../assets/styles/assignment.css';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    History,
    NotepadText,
    Award,
    Send,
    BadgeCheck,
    Edit,
    Save,
} from 'lucide-react';

const AssignmentScreen = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [pending] = useState([
    { id: 1, title: 'Data Structures Lab 3', dueDate: 'Jan 25, 2026, 9:30pm', dueTime: '11:59 PM' },
    { id: 2, title: 'Algorithm Analysis Essay', dueDate: 'Jan 28, 2026', dueTime: '5:00 PM' },
    { id: 3, title: 'Database Design Project', dueDate: 'Feb 1, 2026', dueTime: '11:59 PM' },
  ]);

  const [submitted] = useState([
    { id: 1, title: 'Programming Fundamentals Quiz', dueDate: 'Jan 20, 2026', submittedDate: 'Jan 19, 2026', studentName: 'John Doe', link: 'https://drive.google.com/file/abc123', status: 'Pending' },
    { id: 2, title: 'Web Development Assignment 2', dueDate: 'Jan 18, 2026', submittedDate: 'Jan 18, 2026', studentName: 'Jane Smith', link: 'https://github.com/student/web-dev', status: 'Pending' },
  ]);

  const [graded] = useState([
    { id: 1, title: 'Introduction to Python', dueDate: 'Jan 10, 2026', submittedDate: 'Jan 19, 2026', studentName: 'Mike Johnson', link: 'https://github.com/student/web-dev', score: '95%' },
    { id: 2, title: 'Operating Systems Lab 1', dueDate: 'Jan 8, 2026', submittedDate: 'Jan 19, 2026', studentName: 'Sarah Williams', link: 'https://github.com/student/web-dev', score: '88%' },
    { id: 3, title: 'Computer Networks Report', dueDate: 'Jan 5, 2026', submittedDate: 'Jan 19, 2026', studentName: 'Alex Brown', link: 'https://github.com/student/web-dev', score: '92%' },
  ]);

  const [scores, setScores] = useState({});
  const [editingGradedId, setEditingGradedId] = useState(null);

  const handleScoreChange = (assignmentId, value) => {
    setScores(prev => ({ ...prev, [assignmentId]: value }));
  };

  const handleSaveScore = (assignmentId) => {
    // Logic will be added later
    console.log(`Saving score for assignment ${assignmentId}: ${scores[assignmentId]}`);
  };

  const handleEditScore = (assignmentId, currentScore) => {
    setEditingGradedId(assignmentId);
    setScores(prev => ({ ...prev, [assignmentId]: currentScore.replace('%', '') }));
  };

  const handleSaveEditedScore = (assignmentId) => {
    // Logic will be added later
    console.log(`Saving edited score for assignment ${assignmentId}: ${scores[assignmentId]}`);
    setEditingGradedId(null);
  };

  return (
    <UnderDevelopment section="Assignment" />
    // <div className="assignments-container">
    //   {/* STUDENT VIEW - Show Pending, Submitted, and Graded */}
    //   {!isAdmin && (
    //     <>
    //       {/* 1. Pending Assignments */}
    //       <section className="assignment-card pending-section">
    //         <div className="card-header">
    //           <h3>
    //             <span className='orange'><History size={19}/></span> 
    //             Pending Assignments
    //           </h3>
    //           <span className="count-badge orange">{pending.length} assignments</span>
    //         </div>
    //         <div className="table-responsive">
    //           <table className='assignment__table'>
    //             <thead>
    //               <tr>
    //                 <th>#</th>
    //                 <th>Title</th>
    //                 <th>Due Date</th>
    //                 <th>Assignment Link</th>
    //                 <th>Action</th>
    //               </tr>
    //             </thead>
    //             {pending.length > 0 &&
    //             <tbody>
    //               {pending.map((item, index) => (
    //                 <tr key={item.id}>
    //                   <td>{index + 1}</td>
    //                   <td className="bold">{item.title}</td>
    //                   <td className='assignment__date'>{item.dueDate}</td>
    //                   <td className='first-inputs'><input type="text" placeholder="Paste your assignment link here..." className="link-input first-input" /></td>
    //                   <td className='assignment__action'>
    //                     <button className="submit-btn"><span><Send size={18}/></span>Submit</button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>}
    //           </table>
              
    //           {pending.length === 0 && <p className='empty__assignment'>No Pending Assignment</p>}
    //         </div>
    //       </section>

    //       {/* 2. Submitted Assignments */}
    //       <section className="assignment-card submitted-section">
    //         <div className="card-header">
    //           <h3>
    //             <span className='blue'><NotepadText size={19}/></span> 
    //             Submitted Assignments
    //           </h3>
    //           <span className="count-badge blue">{submitted.length} assignments</span>
    //         </div>
    //         <div className="table-responsive">
    //           <table className='assignment__table'>
    //             <thead>
    //               <tr>
    //                 <th>#</th>
    //                 <th>Title</th>
    //                 <th>Due Date</th>
    //                 <th>Submitted Date</th>
    //                 <th>Assignment Link</th>
    //                 <th>Status</th>
    //               </tr>
    //             </thead>
    //             {submitted.length > 0 &&
    //             <tbody>
    //               {submitted.map((item, index) => (
    //                 <tr key={item.id}>
    //                   <td>{index + 1}</td>
    //                   <td className="bold">{item.title}</td>
    //                   <td>{item.dueDate}</td>
    //                   <td>{item.submittedDate}</td>
    //                   <td><input type="text" readOnly value={item.link} className="link-input gray" /></td>
    //                   <td className='assignment__action'>
    //                     <span className="status-badge pending">
    //                       <span><History size={18}/></span> {item.status}
    //                     </span>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>}
    //           </table>

    //           {submitted.length === 0 && <p className='empty__assignment'>No Assignment Submitted</p>}
    //         </div>
    //       </section>

    //       {/* 3. Graded Assignments */}
    //       <section className="assignment-card graded-section">
    //         <div className="card-header">
    //           <h3>
    //             <span className='green'><Award size={19}/></span> 
    //             Graded Assignments
    //           </h3>
    //           <span className="count-badge green">{graded.length} assignments</span>
    //         </div>
    //         <div className="table-responsive">
    //           <table className='assignment__table'>
    //             <thead>
    //               <tr>
    //                 <th>#</th>
    //                 <th>Title</th>
    //                 <th>Due Date</th>
    //                 <th>Submitted Date</th>
    //                 <th>Assignment Link</th>
    //                 <th>Score</th>
    //               </tr>
    //             </thead>
    //             {graded.length > 0 &&
    //             <tbody>
    //               {graded.map((item, index) => (
    //                 <tr key={item.id}>
    //                   <td>{index + 1}</td>
    //                   <td className="bold">{item.title}</td>
    //                   <td>{item.dueDate}</td>
    //                   <td>{item.submittedDate}</td>
    //                   <td><input type="text" readOnly value={item.link} className="link-input gray" /></td>
    //                   <td className='assignment__action'>
    //                     <span className="score-badge">
    //                       <span><BadgeCheck size={18}/></span> {item.score}
    //                     </span>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>}
    //           </table>

    //           {graded.length === 0 && <p className='empty__assignment'>No Assignment Graded</p>}
    //         </div>
    //       </section>
    //     </>
    //   )}

    //   {/* ADMIN VIEW - Show Submitted and Graded only */}
    //   {isAdmin && (
    //     <>
    //       {/* 1. Submitted Assignments (Admin View) */}
    //       <section className="assignment-card submitted-section">
    //         <div className="card-header">
    //           <h3>
    //             <span className='blue'><NotepadText size={19}/></span> 
    //             Submitted Assignments
    //           </h3>
    //           <span className="count-badge blue">{submitted.length} assignments</span>
    //         </div>
    //         <div className="table-responsive">
    //           <table className='assignment__table'>
    //             <thead>
    //               <tr>
    //                 <th>#</th>
    //                 <th>Title</th>
    //                 <th>Student Name</th>
    //                 <th>Due Date</th>
    //                 <th>Submitted Date</th>
    //                 <th>Assignment Link</th>
    //                 <th>Score</th>
    //                 <th>Action</th>
    //               </tr>
    //             </thead>
    //             {submitted.length > 0 &&
    //             <tbody>
    //               {submitted.map((item, index) => (
    //                 <tr key={item.id}>
    //                   <td>{index + 1}</td>
    //                   <td className="bold">{item.title}</td>
    //                   <td className="bold">{item.studentName}</td>
    //                   <td>{item.dueDate}</td>
    //                   <td>{item.submittedDate}</td>
    //                   <td><input type="text" readOnly value={item.link} className="link-input gray" /></td>
    //                   <td className='score-input-cell'>
    //                     <input 
    //                       type="number" 
    //                       placeholder="Enter score..." 
    //                       className="score-input" 
    //                       value={scores[item.id] || ''}
    //                       onChange={(e) => handleScoreChange(item.id, e.target.value)}
    //                       min="0"
    //                       max="100"
    //                     />
    //                   </td>
    //                   <td className='assignment__action'>
    //                     <button className="save-score-btn" onClick={() => handleSaveScore(item.id)}>
    //                       <span><Save size={18}/></span>Save
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>}
    //           </table>

    //           {submitted.length === 0 && <p className='empty__assignment'>No Assignment Submitted</p>}
    //         </div>
    //       </section>

    //       {/* 2. Graded Assignments (Admin View with Edit) */}
    //       <section className="assignment-card graded-section">
    //         <div className="card-header">
    //           <h3>
    //             <span className='green'><Award size={19}/></span> 
    //             Graded Assignments
    //           </h3>
    //           <span className="count-badge green">{graded.length} assignments</span>
    //         </div>
    //         <div className="table-responsive">
    //           <table className='assignment__table'>
    //             <thead>
    //               <tr>
    //                 <th>#</th>
    //                 <th>Title</th>
    //                 <th>Student Name</th>
    //                 <th>Due Date</th>
    //                 <th>Submitted Date</th>
    //                 <th>Assignment Link</th>
    //                 <th>Score</th>
    //                 <th>Action</th>
    //               </tr>
    //             </thead>
    //             {graded.length > 0 &&
    //             <tbody>
    //               {graded.map((item, index) => (
    //                 <tr key={item.id}>
    //                   <td>{index + 1}</td>
    //                   <td className="bold">{item.title}</td>
    //                   <td className="bold">{item.studentName}</td>
    //                   <td>{item.dueDate}</td>
    //                   <td>{item.submittedDate}</td>
    //                   <td><input type="text" readOnly value={item.link} className="link-input gray" /></td>
    //                   <td>
    //                     {editingGradedId === item.id ? (
    //                       <input 
    //                         type="number" 
    //                         className="score-input" 
    //                         value={scores[item.id] || ''}
    //                         onChange={(e) => handleScoreChange(item.id, e.target.value)}
    //                         min="0"
    //                         max="100"
    //                       />
    //                     ) : (
    //                       <span className="score-badge">
    //                         <span><BadgeCheck size={18}/></span> {item.score}
    //                       </span>
    //                     )}
    //                   </td>
    //                   <td className='assignment__action'>
    //                     {editingGradedId === item.id ? (
    //                       <button className="save-score-btn" onClick={() => handleSaveEditedScore(item.id)}>
    //                         <span><Save size={18}/></span>Save
    //                       </button>
    //                     ) : (
    //                       <button className="edit-btn" onClick={() => handleEditScore(item.id, item.score)}>
    //                         <span><Edit size={18}/></span>Edit
    //                       </button>
    //                     )}
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>}
    //           </table>

    //           {graded.length === 0 && <p className='empty__assignment'>No Assignment Graded</p>}
    //         </div>
    //       </section>
    //     </>
    //   )}
    // </div>
  );
};

export default AssignmentScreen;