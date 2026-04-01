import React, { useState, useEffect } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBlock, setFilterBlock] = useState("");

  const categories = ["Library","Hostel","Labs","Room","Canteen","Transport","Wi-Fi","Sports","Academics","Maintenance","Security"];
  const blocks = ["A","B","C","D","E","F","G","H","I"];

  // Load all complaints
  const loadAll = async () => {
    try {
      const res = await API.get("/complaints/all");
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/update/${id}`, { status });
      loadAll();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout admin
  const logout = () => {
    navigate("/admin-login");
  };

  // Load complaints on component mount
  useEffect(() => {
    loadAll();
  }, []);

  const filtered = complaints.filter(c =>
    (!filterCategory || c.category === filterCategory) &&
    (!filterBlock || c.block === filterBlock)
  );

  return (
    <div className="container" style={{ maxWidth:"900px", margin:"auto", padding:"20px" }}>
      <h2 style={{ textAlign:"center" }}>Admin Dashboard - Anurag University</h2>

      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"15px" }}>
        <div>
          <select onChange={e => setFilterCategory(e.target.value)} value={filterCategory}>
            <option value="">Filter by Category</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select onChange={e => setFilterBlock(e.target.value)} value={filterBlock} style={{ marginLeft:"10px" }}>
            <option value="">Filter by Block</option>
            {blocks.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
        <button onClick={logout} style={{ backgroundColor:"#e74c3c", color:"white", padding:"5px 15px", border:"none", borderRadius:"5px" }}>
          Logout
        </button>
      </div>

      <h4>Total Complaints: {filtered.length}</h4>

      {filtered.map(c => (
        <div key={c.id} className="card" style={{ marginBottom:"15px", padding:"15px", borderRadius:"10px", boxShadow:"2px 2px 10px #ccc", backgroundColor:"#f9f9f9" }}>
          <p><b>Student:</b> {c.studentEmail}</p>
          <p><b>Category:</b> {c.category}</p>
          <p><b>Block:</b> {c.block}</p>
          <p><b>Room:</b> {c.roomNumber}</p>
          <p><b>Description:</b> {c.description}</p>
          <p>
            <b>Status:</b> 
            <span style={{ color:c.status==="Resolved"?"green":c.status==="In Progress"?"orange":"red", fontWeight:"bold", marginLeft:"5px" }}>
              {c.status}
            </span>
          </p>
          <p><b>Created At:</b> {new Date(c.createdAt).toLocaleString()}</p>
          <p><b>Resolved At:</b> {c.resolvedAt ? new Date(c.resolvedAt).toLocaleString() : "Not Resolved"}</p>
          <div style={{ marginTop:"10px" }}>
            <button onClick={() => updateStatus(c.id,"In Progress")} style={{ marginRight:"10px" }}>In Progress</button>
            <button onClick={() => updateStatus(c.id,"Resolved")}>Resolved</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
