import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../api";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      navigate(`/task/${response.data.task.id}`);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("There was an issue submitting the task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: updatedTask.title,
          description: updatedTask.description,
          dueDate: updatedTask.dueDate,
          status: updatedTask.status,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with:", errorText);
        throw new Error("Failed to update task");
      }

      const data = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? data.task : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Could not update task. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📝 Task Manager</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="bg-white rounded-lg p-4 mb-6 shadow">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Add New Task</h3>
        <TaskForm onSubmitTask={handleAddTask} />
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="text-xl font-semibold text-gray-700 mb-3"> </h3>
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
};

export default TaskPage;
