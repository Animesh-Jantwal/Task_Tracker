function TaskFilters({ filters, setFilters }) {
  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setFilters((prev) => ({ ...prev, priority: e.target.value }));
  };

  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split('-');
    setFilters((prev) => ({ ...prev, sortBy, order }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-3 items-center">
      <select
        value={filters.status}
        onChange={handleStatusChange}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Status
        </option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.priority}
        onChange={handlePriorityChange}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        value={`${filters.sortBy}-${filters.order}`}
        onChange={handleSortChange}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>
    </div>
  );
}

export default TaskFilters;