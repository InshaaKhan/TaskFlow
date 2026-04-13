import { useState } from 'react';
import { Plus, Trash2, ChevronRight } from 'lucide-react';

type Status = 'todo' | 'in-progress' | 'done';

interface Task {
  id: number;
  title: string;
  status: Status;
}

const STATUS_ORDER: Status[] = ['todo', 'in-progress', 'done'];

const STATUS_LABELS: Record<Status, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const STATUS_STYLES: Record<Status, string> = {
  'todo': 'bg-slate-100 text-slate-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  'done': 'bg-emerald-100 text-emerald-700',
};

const STATUS_DOT: Record<Status, string> = {
  'todo': 'bg-slate-400',
  'in-progress': 'bg-amber-500',
  'done': 'bg-emerald-500',
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Review project requirements', status: 'done' },
    { id: 2, title: 'Design wireframes', status: 'in-progress' },
    { id: 3, title: 'Implement authentication', status: 'todo' },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), title: trimmed, status: 'todo' },
    ]);
    setInput('');
  };

  const advanceStatus = (id: number) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        const idx = STATUS_ORDER.indexOf(task.status);
        const next = STATUS_ORDER[Math.min(idx + 1, STATUS_ORDER.length - 1)];
        return { ...task, status: next };
      })
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const counts = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = tasks.filter(t => t.status === s).length;
    return acc;
  }, {} as Record<Status, number>);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Task Manager</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {tasks.length === 0
              ? 'No tasks yet. Add one below.'
              : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} total`}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {STATUS_ORDER.map(s => (
            <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <div className={`text-2xl font-bold ${s === 'done' ? 'text-emerald-600' : s === 'in-progress' ? 'text-amber-600' : 'text-slate-600'}`}>
                {counts[s]}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{STATUS_LABELS[s]}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <button
            onClick={addTask}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-xl shadow-sm transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No tasks yet. Add your first task above.
            </div>
          )}
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[task.status]}`} />

              <span className={`flex-1 text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {task.title}
              </span>

              <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${STATUS_STYLES[task.status]}`}>
                {STATUS_LABELS[task.status]}
              </span>

              {task.status !== 'done' && (
                <button
                  onClick={() => advanceStatus(task.id)}
                  title="Advance status"
                  className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                  <ChevronRight size={16} />
                </button>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                title="Delete task"
                className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 ml-1"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
