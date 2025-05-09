import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/complaintForm.css";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    const userComplaints = allComplaints
      .map((c, i) => ({ ...c, globalIndex: i }))
      .filter((c) => c.user === currentUser.username);
    setComplaints(userComplaints);
  }, []);

  const addComplaint = (newComplaint) => {
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    complaints.push(newComplaint);

    localStorage.setItem("complaints", JSON.stringify(complaints));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allComplaints = JSON.parse(localStorage.getItem("complaints")) || [];

    let updatedComplaints = [...allComplaints];
    if (editIndex !== null) {
      const globalIndex = allComplaints.findIndex(
        (c, i) =>
          c.user === currentUser.username &&
          i === complaints[editIndex].globalIndex
      );

      updatedComplaints[globalIndex] = {
        ...updatedComplaints[globalIndex],
        title,
        description,
        type,
        updatedAt: new Date().toLocaleString(),
        status: "Pending",
        resolvedDate: null,
      };

      setEditIndex(null);
    } else {
      const newComplaint = {
        title,
        description,
        type,
        status: "Pending",
        date: new Date().toLocaleString(),
        updatedAt: null,
        resolvedDate: null,
        user: currentUser.username,
      };
      updatedComplaints.push(newComplaint);
    }

    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
    const userComplaints = updatedComplaints
      .map((c, i) => ({ ...c, globalIndex: i }))
      .filter((c) => c.user === currentUser.username);
    setComplaints(userComplaints);
    setTitle("");
    setDescription("");
    setType("");
  };

  const handleEdit = (index) => {
    const c = complaints[index];
    setTitle(c.title);
    setDescription(c.description);
    setType(c.type);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allComplaints = JSON.parse(localStorage.getItem("complaints")) || [];

    const complaintToDelete = complaints[index];
    const globalIndex = complaintToDelete.globalIndex;

    const updatedComplaints = allComplaints.filter((_, i) => i !== globalIndex);
    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));

    const userComplaints = updatedComplaints
      .map((c, i) => ({ ...c, globalIndex: i }))
      .filter((c) => c.user === currentUser.username);

    setComplaints(userComplaints);
  };

  const filteredComplaints = complaints.filter(
    (c) =>
      (c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterType ? c.type === filterType : true)
  );

  return (
    <div className=" ">
      <Navbar />
      <div className="complaint-page1">
        <form onSubmit={handleSubmit} className="">
          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className=" filter "
          >
            <option value="">Filter by Category</option>
            <option value="">All Types</option>
            <option value="Academic/Faculty">Academic/Faculty</option>
            <option value="Infrastructure/Maintenance">
              Infrastructure/Maintenance
            </option>
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

          <div className="submit_box">
            <h2 className=" heading ">
              {editIndex !== null ? "Edit Complaint" : "Submit Complaint"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              id="title"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="select-catg"
            >
              <option id="select-cat-title" value="">
                Select Category
              </option>
              <option value="Academic/Faculty">Academic/Faculty</option>
              <option value="Infrastructure/Maintenance">
                Infrastructure/Maintenance
              </option>
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
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              id="description"
            ></textarea>
            <button type="submit" className="button">
              {editIndex !== null ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        <div className="complaint-page2">
          <h3 className="your_complaints">Your Complaints</h3>
          <div className="scroll">
            {filteredComplaints.length === 0 ? (
              <p className="complaint_found">No complaints found!</p>
            ) : (
              <ul className="submitted_complaint">
                <div>
                  {filteredComplaints.map((c, index) => (
                    <li key={index} className="border p-3 rounded shadow">
                      <h4 className="font-bold">{c.title}</h4>
                      <p>
                        <strong>Category:</strong> {c.type}
                      </p>
                      <p>{c.description}</p>

                      <p>
                        <strong>Submitted:</strong> {c.date}
                      </p>
                      {c.updatedAt && (
                        <p>
                          <strong>Last Updated:</strong> {c.updatedAt}
                        </p>
                      )}
                      {c.status === "Resolved" && (
                        <p>
                          <strong>Resolved:</strong> {c.resolvedDate || "N/A"}
                        </p>
                      )}

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={
                            c.status === "Resolved"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }
                        >
                          {c.status}
                        </span>
                      </p>

                      <div className="flex gap-4 mt-2">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
