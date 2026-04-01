import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/users/login", { email, password });
      if (res.data && res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        alert("Only Admins can login here!");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error!");
    }
  };

  return (
    <div className="container" style={{ maxWidth:"400px", margin:"50px auto" }}>
      <h2>Admin Login - Anurag University</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p onClick={() => navigate("/")}>Student Login</p>
    </div>
  );
}

export default AdminLogin;
