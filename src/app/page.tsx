'use client';

import { useState, useEffect, useCallback } from 'react';
// TodoForm is integrated directly in this file
import TodoItem from '@/components/TodoItem';
import TodoFilter from '@/components/TodoFilter';
import { Todo, Priority } from '@/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'priority' | 'dueDate'>('createdAt');

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        filter,
        sortBy,
      });
      
      const response = await fetch(`/api/todos?${params}`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [filter, sortBy]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add new todo
  const handleAddTodo = async (title: string, priority: Priority, dueDate?: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          priority,
          dueDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 font-medium animate-pulse';
      notification.textContent = '✓ Task added successfully';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
      
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  // Update todo
  const handleUpdateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      
      // Show success message
      const message = updates.completed !== undefined 
        ? (updates.completed ? '✓ Task completed successfully' : '✓ Task updated successfully')
        : '✓ Task updated successfully';
      
      // Enhanced success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 font-medium animate-pulse';
      notification.textContent = message;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
      
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');

      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 font-medium animate-pulse';
      notification.textContent = '✓ Task deleted successfully';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 4000);
      
      await fetchTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  return (
    <div className='min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black'>
      <div className='min-h-screen mx-auto max-w-5xl px-4 py-8'>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300 mb-3">
            TaskMaster
          </h1>
          <p className="text-slate-400 text-lg">
            Organize your life, one task at a time
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Add New Task</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
            const priority = (form.elements.namedItem('priority') as HTMLSelectElement).value as Priority;
            const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement).value || undefined;
            if (title.trim()) {
              handleAddTodo(title, priority, dueDate);
              form.reset();
            }
          }} className="space-y-4">
            <input
              name="title"
              type="text"
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="priority"
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
              >
                <option value="LOW" className="bg-slate-800">🟢 Low Priority</option>
                <option value="MEDIUM" className="bg-slate-800">🟡 Medium Priority</option>
                <option value="HIGH" className="bg-slate-800">🔴 High Priority</option>
              </select>
              <input
                name="dueDate"
                type="date"
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-slate-100 font-medium rounded-lg hover:from-slate-500 hover:to-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ✨ Add Task
              </button>
            </div>
          </form>
        </div>

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          currentSort={sortBy}
          onSortChange={setSortBy}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent mx-auto"></div>
                <div className="absolute inset-0 animate-ping">
                  <div className="h-12 w-12 rounded-full bg-purple-400 opacity-20 mx-auto"></div>
                </div>
              </div>
              <p className="text-slate-400 mt-4">Loading your tasks...</p>
            </div>
          </div>
        ) : todos.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                {filter === 'all' ? 'No tasks yet!' : `No ${filter} tasks`}
              </h3>
              <p className="text-slate-400">
                {filter === 'all' ? 'Add your first task to get started!' : `No tasks marked as ${filter}`}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 flex items-center justify-between mb-4">
              <span className="text-slate-200 font-medium">Task Overview</span>
              <div className="flex gap-4 text-sm">
                <span className="text-purple-300">{todos.filter(t => !t.completed).length} Active</span>
                <span className="text-pink-300">{todos.filter(t => t.completed).length} Completed</span>
              </div>
            </div>
            <div className="space-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                  <TodoItem
                    todo={todo}
                    onUpdateTodo={handleUpdateTodo}
                    onDeleteTodo={handleDeleteTodo}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
