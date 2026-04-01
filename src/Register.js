import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const register = async () => {
    try {
      await API.post("/users/register", user);
      alert("Registered Successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error while registering");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setUser({ ...user, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setUser({ ...user, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
