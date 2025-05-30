import React from "react";
import { Link } from "react-router-dom";

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleToggleComplete = () => {
    let newStatus;

    if (task.status === "pending") {
      newStatus = "inProgress";
    } else if (task.status === "inProgress") {
      newStatus = "completed";
    } else {
      newStatus = "pending";
    }

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    onUpdateTask(updatedTask); // ✅ Call parent update handler
  };

  const renderStatus = () => {
    switch (task.status) {
      case "pending":
        return "Pending ⏳";
      case "inProgress":
        return "In Progress 🔄";
      case "completed":
        return "Completed ✅";
      case "cancelled":
        return "Cancelled ❌";
      default:
        return task.status;
    }
  };

  const getNextStatusLabel = () => {
    switch (task.status) {
      case "pending":
        return "In Progress";
      case "inProgress":
        return "Completed";
      default:
        return "Pending";
    }
  };

  return (
    <li className="bg-white shadow rounded-xl p-4 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800">{task.description}</h4>
      <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleString()}</p>
      <p className="text-sm text-gray-700 mb-3">Status: {renderStatus()}</p>

      <div className="flex flex-wrap items-center gap-3 mt-2">
        <button
          onClick={handleToggleComplete}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Mark as {getNextStatusLabel()}
        </button>

        <button
          onClick={() => onDeleteTask(task.id)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>

        <Link
          to={`/tasks/${task.id}`}
          className="text-blue-500 underline text-sm hover:text-blue-700"
        >
          View Details
        </Link>
      </div>
    </li>
  );
};

export default TaskItem;
