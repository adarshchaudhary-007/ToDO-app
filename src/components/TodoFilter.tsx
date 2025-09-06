'use client';

interface TodoFilterProps {
  currentFilter: string;
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  currentSort: string;
  onSortChange: (sort: 'createdAt' | 'priority' | 'dueDate') => void;
}

export default function TodoFilter({
  currentFilter,
  onFilterChange,
  currentSort,
  onSortChange,
}: TodoFilterProps) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Filter
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
                currentFilter === 'all'
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-600/50'
              }`}
            >
              ✨ All Tasks
            </button>
            <button
              onClick={() => onFilterChange('active')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
                currentFilter === 'active'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-600/50'
              }`}
            >
              ⚡ Active
            </button>
            <button
              onClick={() => onFilterChange('completed')}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
                currentFilter === 'completed'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-600/50'
              }`}
            >
              ✅ Completed
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Sort By
          </label>
          <select
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value as 'createdAt' | 'priority' | 'dueDate')}
            className="px-4 py-2.5 bg-slate-800/80 border border-slate-600/50 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 shadow-md"
          >
            <option value="createdAt" className="bg-slate-800 text-slate-200">📅 Created Date</option>
            <option value="priority" className="bg-slate-800 text-slate-200">🔥 Priority Level</option>
            <option value="dueDate" className="bg-slate-800 text-slate-200">📆 Due Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}