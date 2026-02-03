import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import TaskDetail from "./pages/TaskDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          {/* Home page is always public and shown first */}
          <Route path="/" element={<Home />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/tasks" element={<PrivateRoute element={<TaskPage />} />} />
          <Route path="/tasks/:id" element={<PrivateRoute element={<TaskDetail />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
