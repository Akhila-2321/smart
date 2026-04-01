import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/users/login", user);
      if (res.data) {
        if (res.data.role === "ADMIN") navigate("/admin");
        else {
          localStorage.setItem("email", res.data.email);
          navigate("/student");
        }
      } else alert("Invalid Credentials");
    } catch (err) {
      console.error(err);
      alert("Server Error!");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>🎓 Anurag University</h2>

      <input placeholder="Email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
      <input type="password" placeholder="Password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />

      <button onClick={login}>Login</button>
      <p onClick={() => navigate("/register")}>New user? Register</p>
    </div>
  );
}

export default Login;
