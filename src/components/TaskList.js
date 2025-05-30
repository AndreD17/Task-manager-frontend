import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Your Tasks</h3>
      <ul className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
