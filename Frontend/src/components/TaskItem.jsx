function TaskItem({ task, onDelete, onToggleStatus }) {
  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-start justify-between">
      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h3>

        {task.description && (
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {task.status}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={() => onToggleStatus(task)}
          className="text-xs px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
        >
          {isCompleted ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-xs px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;