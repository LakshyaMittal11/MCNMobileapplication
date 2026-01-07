# ⏱ TimeRush Arena

TimeRush Arena is a skill-based, time-bound quiz application designed to convert user time into learning and rewards.  
This project is implemented as a **single-folder full-stack web application** using HTML, CSS, JavaScript, and Node.js.

---

## 🚀 Key Features

- 👤 Simple user login (name-based)
- 🧠 Skill-based quiz gameplay
- 🌐 Dynamic questions fetched via backend API
- 📚 Category selection (GK, Computer Science, Mathematics)
- 🎯 Difficulty selection (Easy, Medium, Hard)
- ⏳ Timer-based session gameplay
- 💰 Reward system (Sharp Coins)
- 🏆 Leaderboard managed on backend
- 📱 Mobile-friendly UI
- 🧩 Single-server architecture (Frontend + Backend together)


## 🏗️ System Architecture

Browser (HTML / CSS / JavaScript)
|
| HTTP Requests
v
Node.js + Express Server
|
v
External Quiz API (Open Trivia DB)


- Frontend handles UI and gameplay logic
- Backend acts as:
  - Proxy for quiz questions
  - Leaderboard manager
- Both frontend and backend are served from the same Express server

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- CORS
- node-fetch

### External Service
- Open Trivia Database (Quiz API)

📂 Project Structure (Single Folder)

TimeRushArena/
│
├── index.html # Frontend UI
├── style.css # Styling
├── script.js # Frontend logic
├── server.js # Express backend
├── package.json # Project configuration
├── package-lock.json # Dependency lock
└── README.md

▶️ How to Run the Project

1️⃣ Install Dependencies
```bash
npm install

2️⃣ Start the Application
 node server.js
 
✅ App running at http://localhost:5000