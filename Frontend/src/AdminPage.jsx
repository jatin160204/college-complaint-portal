import { useEffect, useState } from 'react';
import React from 'react';
import Navbar from "./Navbar";


const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState(''); 

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(stored);
  }, []);

  const handleDelete = (index) => {
    const updated = complaints.filter((_, i) => i !== index);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setComplaints(updated);
  };

  const toggleStatus = (index) => {
    const updated = [...complaints];
    updated[index].status = updated[index].status === "Resolved" ? "Pending" : "Resolved";
    localStorage.setItem('complaints', JSON.stringify(updated));
    setComplaints(updated);
  };


  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesType = filterType === '' || c.type === filterType;  // 🔹 Added this line
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
            <Navbar />

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredComplaints.map((c, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p><strong>Type:</strong> {c.type}</p>
              <p>{c.description}</p>
            
<p>
  <strong>Status:</strong>{' '}
  <span className={c.status === "Resolved" ? "text-green-600" : "text-yellow-600"}>
    {c.status}
  </span>
</p>
<p><strong>Submitted:</strong> {c.date}</p>
{c.updatedAt && <p><strong>Last Updated:</strong> {c.updatedAt}</p>}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => toggleStatus(index)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Toggle Status
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default AdminPage;
