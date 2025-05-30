import React, { useState } from "react";
import api from "../api";

const TaskForm = ({ onAddTask }) => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const newTask = { description, dueDate };
      const response = await api.post("/tasks", newTask);
      onAddTask(response.data.task);
      console.log("Response from backend:", response.data);
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
