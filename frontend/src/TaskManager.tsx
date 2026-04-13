import React, { useState } from 'react';
import './TaskManager.css';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');

  const addTask = (): void => {
    if (input.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      title: input,
      status: 'todo',
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const updateTaskStatus = (id: number, newStatus: 'todo' | 'in-progress' | 'done'): void => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (id: number): void => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const getStatusColor = (status: 'todo' | 'in-progress' | 'done'): string => {
    switch (status) {
      case 'todo':
        return '#ef4444';
      case 'in-progress':
        return '#f59e0b';
      case 'done':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add Task
        </button>
      </div>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add one to get started!</p>
        ) : (
          <ul className="tasks-list">
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <div className="task-content">
                  <span className="task-title">{task.title}</span>
                  <span
                    className="task-status"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task.id,
                        e.target.value as 'todo' | 'in-progress' | 'done'
                      )
                    }
                    className="status-select"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="task-stats">
        <p>
          Total: <strong>{tasks.length}</strong> | Todo:{' '}
          <strong>{tasks.filter(t => t.status === 'todo').length}</strong> | In Progress:{' '}
          <strong>{tasks.filter(t => t.status === 'in-progress').length}</strong> | Done:{' '}
          <strong>{tasks.filter(t => t.status === 'done').length}</strong>
        </p>
      </div>
    </div>
  );
};

export default TaskManager;
