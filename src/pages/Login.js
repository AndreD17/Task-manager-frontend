import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://task-manager-backend-qc8t.onrender.com/api/auth/login", {
      email,
      password,
     });

      localStorage.setItem("token", response.data.token); // Save the token
      navigate("/tasks"); // Redirect to homepage
      console.log('Login successful:', response.data);
    } catch (err) {
      console.error("Error logging in", err);
      alert(err.response?.data?.message || "Login failed check your email and password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
