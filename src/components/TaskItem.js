import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit2, FiExternalLink, FiClock, FiAlertCircle } from "react-icons/fi";

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
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

    onUpdateTask(updatedTask);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    onDeleteTask(task.id);
    setLoading(false);
  };

  const renderStatus = () => {
    const statuses = {
      pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
      inProgress: { label: "In Progress", color: "bg-blue-100 text-blue-800", icon: "🔄" },
      completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: "✅" },
      cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800", icon: "❌" },
    };

    const status = statuses[task.status] || statuses.pending;
    return (
      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
        <span>{status.icon}</span>
        <span>{status.label}</span>
      </div>
    );
  };

  const renderPriority = () => {
    const priorities = {
      low: { label: "Low", color: "text-green-600" },
      medium: { label: "Medium", color: "text-yellow-600" },
      high: { label: "High", color: "text-red-600" },
    };

    const priority = priorities[task.priority] || priorities.medium;
    return <span className={`text-sm font-medium ${priority.color}`}>{priority.label}</span>;
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed";

  const getNextStatusLabel = () => {
    switch (task.status) {
      case "pending":
        return "Start";
      case "inProgress":
        return "Complete";
      default:
        return "Re-open";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li className={`card transition-all duration-200 hover:shadow-lg ${isOverdue ? "border-l-4 border-l-red-500" : ""}`}>
      <div className="card-body space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-1">{task.title || task.description}</h4>
            {task.description && task.title && (
              <p className="text-sm text-gray-600">{task.description}</p>
            )}
          </div>
          {isOverdue && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium">
              <FiAlertCircle size={14} />
              <span>Overdue</span>
            </div>
          )}
        </div>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <FiClock size={16} />
            <span className={isOverdue ? "text-red-600 font-medium" : ""}>
              {formatDate(task.dueDate)}
            </span>
          </div>
          <span className="text-gray-300">•</span>
          {renderPriority()}
          <span className="text-gray-300">•</span>
          {renderStatus()}
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className="btn-primary text-sm flex items-center space-x-1"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <FiEdit2 size={14} />
                <span>{getNextStatusLabel()}</span>
              </>
            )}
          </button>

          <Link
            to={`/tasks/${task.id}`}
            className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
          >
            <FiExternalLink size={14} />
            <span>Details</span>
          </Link>

          {showConfirm ? (
            <>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="btn-danger text-sm"
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              disabled={loading}
              className="ml-auto btn-danger text-sm flex items-center space-x-1"
            >
              <FiTrash2 size={14} />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
