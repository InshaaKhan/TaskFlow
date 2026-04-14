import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email & password");

    const res = await fetch("http://localhost:3002/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) setIsLoggedIn(true);
    else alert(data);
  };

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, task]);
    setTask("");
  };

  // 🔐 LOGIN
  if (!isLoggedIn) {
    return (
      <div style={bg}>
        <div style={blob1}></div>
        <div style={blob2}></div>

        <div style={glass}>
          <h2 style={title}>✨ TaskFlow</h2>

          <div style={inputBox}>
            <span>📧</span>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={input}
            />
          </div>

          <div style={inputBox}>
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={input}
            />
          </div>

          <button onClick={handleLogin} style={btn}>
            Login →
          </button>
        </div>
      </div>
    );
  }

  // 🟢 MAIN
  return (
    <div style={bg}>
      <div style={blob1}></div>
      <div style={blob2}></div>

      <div style={glass}>
        <h2 style={title}>✨ TaskFlow</h2>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
            style={input}
          />
          <button onClick={addTask} style={btn}>
            Add
          </button>
        </div>

        <ul style={{ marginTop: 20 }}>
          {tasks.map((t, i) => (
            <li key={i} style={taskItem}>
              ✅ {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 🎨 STYLES

const bg = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  position: "relative" as const,
  overflow: "hidden",
};

const glass = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  padding: 30,
  borderRadius: 20,
  width: 350,
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  color: "white",
  zIndex: 2,
};

const title = {
  textAlign: "center" as const,
  marginBottom: 20,
};

const inputBox = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.2)",
  padding: "8px 10px",
  borderRadius: 10,
  marginBottom: 10,
};

const input = {
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  marginLeft: 8,
  width: "100%",
};

const btn = {
  width: "100%",
  padding: 10,
  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
  border: "none",
  borderRadius: 10,
  color: "white",
  cursor: "pointer",
  marginTop: 10,
  transition: "0.3s",
};

const taskItem = {
  listStyle: "none",
  padding: 10,
  borderBottom: "1px solid rgba(255,255,255,0.3)",
};

// 🎨 BACKGROUND BLOBS

const blob1 = {
  position: "absolute" as const,
  width: 200,
  height: 200,
  background: "#ff7e5f",
  borderRadius: "50%",
  top: 50,
  left: 50,
  filter: "blur(100px)",
};

const blob2 = {
  position: "absolute" as const,
  width: 200,
  height: 200,
  background: "#764ba2",
  borderRadius: "50%",
  bottom: 50,
  right: 50,
  filter: "blur(100px)",
};