import React, { useState, useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [complaint, setComplaint] = useState({ category: "", block: "", roomNumber: "", description: "" });
  const [complaints, setComplaints] = useState([]);

  const categories = ["Library","Hostel","Labs","Room","Canteen","Transport","Wi-Fi","Sports","Academics","Maintenance","Security"];
  const blocks = ["A","B","C","D","E","F","G","H","I"];

  // Submit a complaint
  const submitComplaint = async () => {
    try {
      await API.post("/complaints", { ...complaint, studentEmail: email });
      setComplaint({ category: "", block: "", roomNumber: "", description: "" });
      loadComplaints();
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  // Load user's complaints
  const loadComplaints = async () => {
    try {
      const res = await API.get(`/complaints/user/${email}`);
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Logout student
  const logout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  // Load complaints on mount
  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Student Dashboard</h2>
      <button onClick={logout} style={{ backgroundColor:"#e74c3c", color:"white", padding:"5px 15px", border:"none", borderRadius:"5px", marginBottom:"15px" }}>Logout</button>

      <div style={{ marginBottom:"15px" }}>
        <select onChange={e => setComplaint({...complaint, category:e.target.value})} value={complaint.category}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <select onChange={e => setComplaint({...complaint, block:e.target.value})} value={complaint.block} style={{ marginLeft:"10px" }}>
          <option value="">Select Block</option>
          {blocks.map(b => <option key={b}>{b}</option>)}
        </select>

        <input placeholder="Room Number" value={complaint.roomNumber} onChange={e => setComplaint({...complaint, roomNumber:e.target.value})} />
        <input placeholder="Description" value={complaint.description} onChange={e => setComplaint({...complaint, description:e.target.value})} />
        <button onClick={submitComplaint}>Submit Complaint</button>
      </div>

      <h3>Your Complaints</h3>
      {complaints.map(c => (
        <div key={c.id} className="card" style={{ padding:"10px", margin:"10px 0", boxShadow:"2px 2px 10px #ccc" }}>
          <p><b>Category:</b> {c.category}</p>
          <p><b>Block:</b> {c.block}</p>
          <p><b>Room:</b> {c.roomNumber}</p>
          <p><b>Description:</b> {c.description}</p>
          <p><b>Status:</b> {c.status}</p>
          <p><b>Created At:</b> {new Date(c.createdAt).toLocaleString()}</p>
          <p><b>Resolved At:</b> {c.resolvedAt ? new Date(c.resolvedAt).toLocaleString() : "Not Resolved"}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;
