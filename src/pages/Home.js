import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Task Manager App</h1>
      <p>Please login or sign up to continue.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup" style={{ marginLeft: "10px" }}>
        <button>Sign Up</button>
      </Link>
      <Link to="/tasks" style={{ marginLeft: "20px" }}>
        <button>View all tasks Tasks</button>
      </Link>
    </div>
  );
};

export default Home;
