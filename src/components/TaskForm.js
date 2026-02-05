import React, { useState } from "react";
import api from "../api";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) return;

    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation
    if (!title.trim() || !description.trim() || !dueDate) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Due date must be in the future
    if (new Date(dueDate) <= new Date()) {
      setError("Due date must be in the future");
      setLoading(false);
      return;
    }

    try {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
      };

      const response = await api.post("/tasks", newTask);

      onAddTask(response.data.task);

      setSuccess("Task created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");

      // Auto-hide success message
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error creating task:", err);

      if (err.response?.status === 400) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
      } else {
        setError("Failed to create task. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ➕ Add New Task
        </h3>

        {error && (
          <div className="flex items-start space-x-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
            <FiAlertCircle
              className="text-red-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-start space-x-3 p-4 mb-4 bg-green-50 border border-green-200 rounded-lg">
            <FiCheckCircle
              className="text-green-600 flex-shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="form-input w-full"
              placeholder="e.g., Complete project proposal"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="form-input resize-none w-full"
              placeholder="Add more details about this task..."
              rows="3"
              required
            />
          </div>

          {/* Due Date + Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                id="dueDate"
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={loading}
                className="form-input w-full"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                disabled={loading}
                className="form-input w-full"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center mt-6 py-3 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Creating task...
              </>
            ) : (
              "Create Task"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
