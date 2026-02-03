import React, { useMemo } from "react";
import TaskItem from "./TaskItem";
import { FiInbox } from "react-icons/fi";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask, loading }) => {
  // ✅ Sort tasks by due date
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [tasks]);

  // ✅ Group tasks by status
  const groupedTasks = useMemo(() => {
    return {
      pending: sortedTasks.filter((t) => t.status === "pending"),
      inProgress: sortedTasks.filter((t) => t.status === "inProgress"),
      completed: sortedTasks.filter((t) => t.status === "completed"),
    };
  }, [sortedTasks]);

  // ✅ Empty state
  if (!loading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FiInbox className="text-gray-400 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600 mb-6 max-w-sm">
          Create your first task to get started. You can set due dates, priorities, and track progress.
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>💡 Tip: Use task details to view and manage individual tasks</span>
        </div>
      </div>
    );
  }

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  // ✅ Render grouped tasks
  return (
    <div className="space-y-6">
      {/* Active Tasks */}
      {(groupedTasks.pending.length > 0 || groupedTasks.inProgress.length > 0) && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
            Active Tasks ({groupedTasks.pending.length + groupedTasks.inProgress.length})
          </h3>
          <ul className="space-y-4">
            {groupedTasks.pending.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask}
              />
            ))}
            {groupedTasks.inProgress.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Completed Tasks */}
      {groupedTasks.completed.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
            Completed ({groupedTasks.completed.length})
          </h3>
          <ul className="space-y-4 opacity-75">
            {groupedTasks.completed.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateTask}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskList;
