const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Review project requirements", status: "done" },
  { id: 2, title: "Design wireframes", status: "in-progress" },
  { id: 3, title: "Implement authentication", status: "todo" }
];

let nextId = 4;

// GET
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST
app.post("/tasks", (req, res) => {
  const { title, status = "todo" } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const newTask = { id: nextId++, title, status };
  tasks.push(newTask);

  res.json(newTask);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.filter(t => t.id !== id);

  res.json({ success: true });
});

// PUT
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;

  tasks = tasks.map(t => (t.id === id ? updated : t));

  res.json(updated);
});

app.listen(3001, () => {
  console.log("🔥 Server running on http://localhost:3001");
});
process.stdin.resume();