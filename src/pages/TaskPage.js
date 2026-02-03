import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../api";
import { FiAlertCircle } from "react-icons/fi";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.tasks || []);
        setError("");
      } catch (error) {
        console.error("Error fetching tasks:", error);

        if (error.response?.status === 401) {
          // Token expired - redirect to login
          navigate("/login");
        } else if (error.response?.status === 404) {
          // No tasks found - treat as empty list
          setTasks([]);
          setError("");
        } else {
          setError(error.response?.data?.msg || error.response?.data?.message || "Failed to load tasks.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [navigate]);

  // ✅ Add new task
  const handleAddTask = async (taskData) => {
    setSyncing(true);
    try {
      const response = await api.post("/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      setError("");
    } catch (err) {
      console.error("Error adding task:", err);
      setError(
        err.response?.data?.message
      );
    } finally {
      setSyncing(false);
    }
  };

  // ✅ Delete task with loading state
  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setError("");
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(
        error.response?.data?.msg ||
        error.response?.data?.message
      );
    }
  };

  // ✅ Update task status or details
  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, {
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        status: updatedTask.status,
        priority: updatedTask.priority,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? response.data.task : task
        )
      );
      setError("");
    } catch (error) {
      console.error("Error updating task:", error);
      setError(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">📝 Task Manager</h1>
          <p className="text-gray-600 mt-2">Organize, prioritize, and track your tasks</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={() => setError("")}
                className="text-sm text-red-700 hover:text-red-800 underline mt-2"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TaskForm onAddTask={handleAddTask} />
            </div>
          </div>

          {/* Task List Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Tasks ({tasks.length})
              </h2>
              {syncing && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  <span>Syncing...</span>
                </div>
              )}
            </div>

            <TaskList
              tasks={tasks}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
