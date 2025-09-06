"use client";

import { useState } from 'react';
import { Todo, Priority } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoItem({ todo, onUpdateTodo, onDeleteTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleToggleComplete = () => {
    onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    onUpdateTodo(todo.id, {
      title: editTitle,
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
    console.log('Task updated successfully! ✨');
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-300 bg-red-500/20 border border-red-500/30';
      case 'medium':
        return 'text-yellow-300 bg-yellow-500/20 border border-yellow-500/30';
      case 'low':
        return 'text-green-300 bg-green-500/20 border border-green-500/30';
      default:
        return 'text-slate-300 bg-slate-700 border border-slate-600';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  if (isEditing) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-3">
        <h4 className="text-slate-100 font-medium mb-3">Edit Task</h4>
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-500"
            placeholder="Task title"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-slate-500"
              >
                <option value="LOW" className="bg-slate-700">Low</option>
                <option value="MEDIUM" className="bg-slate-700">Medium</option>
                <option value="HIGH" className="bg-slate-700">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:outline-none focus:border-slate-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1.5 bg-slate-600 text-slate-100 rounded hover:bg-slate-500 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-slate-600/50 ${
        todo.completed ? 'opacity-60' : ''
      }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <button
            onClick={handleToggleComplete}
            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${
              todo.completed 
                ? 'bg-slate-600 border-slate-500 text-slate-100' 
                : 'border-slate-500 hover:border-slate-400'
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          
          <div className="ml-3 flex-1">
            <h3
              className={`font-medium cursor-pointer ${
                todo.completed 
                  ? 'line-through text-slate-500' 
                  : 'text-slate-100'
              }`}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </h3>
            
            <div className="mt-1.5 flex items-center space-x-2">
              <span
                className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(todo.priority)}`}
              >
                {todo.priority.toLowerCase()}
              </span>
              
              {todo.dueDate && (
                <span className="text-xs text-slate-400">
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-slate-400 hover:text-slate-300"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="p-1 text-slate-400 hover:text-red-400"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}