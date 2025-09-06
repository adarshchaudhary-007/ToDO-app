'use client';

import { useState } from 'react';
import { Priority } from '@/types/todo';

interface TodoFormProps {
  onAddTodo: (title: string, priority: Priority, dueDate?: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsAdding(true);
    try {
      await onAddTodo(title.trim(), priority, dueDate || undefined);
      setTitle('');
      setPriority('MEDIUM');
      setDueDate('');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="mr-2">✨</span>
        Create New Task
      </h2>
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-3">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          placeholder="What needs to be done?"
          required
          disabled={isAdding}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-200 mb-3">
            Priority Level
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            disabled={isAdding}
          >
            <option value="LOW" className="bg-slate-800">🟢 Low Priority</option>
            <option value="MEDIUM" className="bg-slate-800">🟡 Medium Priority</option>
            <option value="HIGH" className="bg-slate-800">🔴 High Priority</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-200 mb-3">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            disabled={isAdding}
          />
        </div>

        <div className="md:self-end">
          <button
            type="submit"
            disabled={isAdding || !title.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {isAdding ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">➕</span>
                Add Elegant Task
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}