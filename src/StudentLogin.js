import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/users/login", { email, password });
      if (res.data) {
        if (res.data.role === "STUDENT") {
          localStorage.setItem("email", email);
          navigate("/student");
        } else {
          alert("This is an admin account. Please use admin login.");
        }
      } else {
        alert("Invalid Credentials!");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error!");
    }
  };

  return (
    <div className="container" style={{ maxWidth:"400px", margin:"50px auto" }}>
      <h2>Student Login - Anurag University</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p onClick={() => navigate("/register")}>New user? Register</p>
      <p onClick={() => navigate("/admin-login")}>Admin Login</p>
    </div>
  );
}

export default StudentLogin;
