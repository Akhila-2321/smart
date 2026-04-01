import React, { useState } from "react";
import API from "./api";

function Admin() {
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = () => {
    API.get("/complaints/all").then((res) => {
      setComplaints(res.data);
    });
  };

  const markCompleted = (id) => {
    API.put(`/complaints/update/${id}`, { status: "Completed" })
      .then(() => {
        alert("Marked as Completed");
        loadComplaints();
      });
  };

  return (
    <div style={{ width: "500px", margin: "auto", marginTop: "40px" }}>
      <h2>Admin Dashboard</h2>

      <button onClick={loadComplaints}>Load Complaints</button>

      {complaints.map((c) => (
        <div key={c.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p><b>{c.studentEmail}</b></p>
          <p>{c.category}</p>
          <p>{c.description}</p>
          <p>Status: {c.status}</p>

          <button onClick={() => markCompleted(c.id)}>
            Mark Completed
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;