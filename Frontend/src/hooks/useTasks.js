import { useState, useEffect } from 'react';
import * as taskService from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Drop empty values so we don't send blank params
      const activeParams = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) activeParams[key] = filters[key];
      });
      const data = await taskService.getTasks(activeParams);
      setTasks(data.tasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const editTask = async (id, updatedData) => {
    try {
      const updated = await taskService.updateTask(id, updatedData);
      setTasks((prev) => prev.map((task) => (task._id === id ? updated : task)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return { tasks, loading, error, fetchTasks, removeTask, editTask, filters, setFilters };
};