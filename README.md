🚀 TaskFlow – Full Stack Task Management App

TaskFlow is a simple full-stack web application that helps users manage their daily tasks efficiently.
It provides a clean UI and backend APIs to create, view, update, and delete tasks.

---

✨ Features

- 📝 Add new tasks
- 📋 View all tasks
- ✏️ Update existing tasks
- ❌ Delete tasks
- ⚡ Fast and responsive UI
- 🔗 Backend API integration

---

🏗️ Project Structure

TaskFlow/
│
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── components/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── docker-compose.yml
├── package.json
├── package-lock.json
└── .gitignore

---

🛠️ Tech Stack

Backend

- Node.js
- Express.js

Frontend

- React (Vite)
- TypeScript
- CSS

---

⚙️ Setup Instructions

1️⃣ Clone Repository

git clone https://github.com/InshaaKhan/TaskFlow.git
cd TaskFlow

---

2️⃣ Backend Setup

cd backend
npm install
npm start

Backend will run on:

http://localhost:5000

---

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173

---

🌐 API Endpoints

- GET "/tasks" → Get all tasks
- POST "/tasks" → Create task
- PUT "/tasks/:id" → Update task
- DELETE "/tasks/:id" → Delete task

---

🚀 Future Improvements

- 🔐 User authentication
- 📱 Better UI/UX
- ☁️ Deployment (Vercel / Render)
- 📊 Task filtering & search

---

👩‍💻 Author

Insha Khan

---

⭐ Support

If you like this project, give it a ⭐ on GitHub!
