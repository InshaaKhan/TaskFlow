import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Review project requirements', status: 'done' },
  { id: 2, title: 'Design wireframes', status: 'in-progress' },
  { id: 3, title: 'Implement authentication', status: 'todo' },
];

let nextId = 4;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, status = 'todo' } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  const validStatuses = ['todo', 'in-progress', 'done'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status must be one of: todo, in-progress, done' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { status, title } = req.body;

  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (status) {
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status must be one of: todo, in-progress, done' });
    }
    task.status = status;
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    task.title = title.trim();
  }

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json(deletedTask[0]);
});

app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});
