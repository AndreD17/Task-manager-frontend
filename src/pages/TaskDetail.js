import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        const fetchedTask = response.data.task;
        setTask(fetchedTask);
        setDescription(fetchedTask.description);
        setDueDate(fetchedTask.dueDate);
        setStatus(fetchedTask.status);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("There was an issue fetching the task.");
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") setDescription(value);
    if (name === "dueDate") setDueDate(value);
    if (name === "status") setStatus(value);
  };

  

  const handleUpdate = async () => {
  if (!description || !dueDate || !status) {
    setError("All fields (description, due date, status) are required.");
    return;
  }

  const formattedDueDate = new Date(dueDate).toISOString();

  try {
    console.log("Sending update with:", {
      description: description,
      dueDate: formattedDueDate,
      status: status,
    });

    const updated = await api.put(`/tasks/${id}`, {
      description: description,
      dueDate: formattedDueDate,
      status: status,
    });

    setTask(updated.data.task);
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    }
    setError("There was an error updating the task.");
  }
};



  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await api.delete(`/tasks/${id}`);
        navigate("/tasks");
      } catch (error) {
        console.error("Error deleting task:", error);
        setError("There was an issue deleting the task.");
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📌 Task Details 📌</h2>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Description</label>
            <input
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Due Date</label>
            <input
              name="dueDate"
              type="datetime-local"
              value={dueDate ? new Date(dueDate).toISOString().slice(0, 16) : ""}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>

          
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 border px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-lg"><strong>Description: </strong>{task.description}</p>
          <p className="text-gray-600">
            <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong>Status:</strong> {task.status}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
