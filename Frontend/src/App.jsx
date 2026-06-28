import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskFilters from './components/TaskFilters';

function App() {
  const { tasks, loading, error, fetchTasks, removeTask, editTask, filters, setFilters } = useTasks();

  const handleToggleStatus = (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    editTask(task._id, { status: newStatus });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Task Tracker
        </h1>

        <TaskForm onTaskAdded={fetchTasks} />

        <div className="mt-6">
          <TaskFilters filters={filters} setFilters={setFilters} />
        </div>

        {loading && <p className="text-center text-gray-500 mt-6">Loading tasks...</p>}
        {error && <p className="text-center text-red-500 mt-6">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 space-y-4">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks match your filters.</p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={removeTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;