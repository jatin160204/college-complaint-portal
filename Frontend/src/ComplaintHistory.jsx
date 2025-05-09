import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import "./styles/history.css";



const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);
  }, []);

  // Filter and search complaints
  const filteredComplaints = complaints.filter((complaint) => {
    return (
      (complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === '' || complaint.type === filterCategory)
    );
  });

  const handleDelete = (index) => {
    const updatedComplaints = [...complaints];
    updatedComplaints.splice(index, 1);
    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTitle(complaints[index].title);
    setEditedDescription(complaints[index].description);
  };

  const handleSave = (index) => {
    const updatedComplaints = [...complaints];
    updatedComplaints[index].title = editedTitle;
    updatedComplaints[index].description = editedDescription;
    updatedComplaints[index].updatedAt = new Date().toLocaleString(); // Track update time
    setComplaints(updatedComplaints);
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setEditingIndex(null);
  };

  return (
    <div>
            <Navbar />

      <input
        type="text"
        placeholder="Search by title or description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Academic/Faculty">Academic/Faculty</option>
        <option value="Infrastructure/Maintenance">Infrastructure/Maintenance</option>
        <option value="Mess/Food Quality">Mess/Food Quality</option>
        <option value="Wi-Fi/Internet">Wi-Fi/Internet</option>
        <option value="Library Facilities">Library Facilities</option>
        <option value="Cleanliness">Cleanliness</option>
        <option value="Ragging/Bullying">Ragging/Bullying</option>
        <option value="Electricity/Water">Electricity/Water</option>
        <option value="IT Services/Lab">IT Services/Lab</option>
        <option value="Transportation">Transportation</option>
        <option value="Exam/Results">Exam/Results</option>
        <option value="Lost & Found">Lost & Found</option>
        <option value="Other">Other</option>
      </select>

      <ul>
        {filteredComplaints.length === 0 ? (
          <li>No complaints found.</li>
        ) : (
          filteredComplaints.map((complaint, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{complaint.title}</h3>
                  <p>{complaint.description}</p>
                  <p>Category: {complaint.type}</p>
                  <p>Status: {complaint.status}</p>
                  <p>Complaint Date: {complaint.date}</p>
                  {complaint.resolvedDate && <p>Resolved Date: {complaint.resolvedDate}</p>}
                  {complaint.updatedAt && <p>Last Updated: {complaint.updatedAt}</p>}
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ComplaintHistory;
