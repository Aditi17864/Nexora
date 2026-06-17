<div align="center">

<br />

# ✦ Nexora

**Modern Committee Management for Educational Institutions**

Nexora replaces spreadsheets and fragmented group chats with a single, intelligent platform — built for committees, coordinators, and students.

<br />

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

<br />

</div>

---

## What is Nexora?

Managing a college committee is harder than it looks — events, tasks, attendance, announcements, and members all need coordination. Nexora brings it all into one place.

- **For Admins** — Full visibility across committees, users, and platform health
- **For Faculty Coordinators** — Monitor performance and publish announcements without the noise
- **For Committee Heads** — Assign tasks, manage members, and run events end-to-end
- **For Student Members** — See what's assigned, register for events, and stay in the loop

---

## Features

| Area | What you get |
|---|---|
| 🎯 **Dashboard** | Live stats, upcoming events, pending tasks, and attendance at a glance |
| 🏛️ **Committee Workspace** | Member directory, activity timeline, shared announcements |
| 📅 **Event Management** | Create events, track registrations, manage participants, view analytics |
| ✅ **Task Tracking** | Kanban board, task assignment, priorities, and progress monitoring |
| 📢 **Announcements** | Role-scoped communications across committees |
| 📊 **Analytics** | Attendance insights and performance reports |
| 🔐 **Role-Based Access** | Granular permissions across four user roles |

---

## Tech Stack

```
Frontend          Backend           Database          Auth
──────────────    ──────────────    ──────────────    ──────────────
React             Node.js           MongoDB Atlas     JWT
TypeScript        Express.js        Mongoose ODM      bcryptjs
Tailwind CSS      TypeScript
React Router
Axios
```

---

## Architecture

```
┌─────────────────────────────────────┐
│           React + TypeScript        │  ← Client
│         (Vite · Tailwind · Axios)   │
└──────────────────┬──────────────────┘
                   │ REST API
┌──────────────────▼──────────────────┐
│          Express + TypeScript       │  ← Server
│       (JWT Auth · Middleware)       │
└──────────────────┬──────────────────┘
                   │ Mongoose
┌──────────────────▼──────────────────┐
│            MongoDB Atlas            │  ← Database
└─────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone

```bash
git clone https://github.com/your-username/nexora.git
cd nexora
```

### 2. Install Dependencies

```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

### 3. Configure Environment

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Frontend → `http://localhost:5173`  
Backend  → `http://localhost:5000`

---

## Project Structure

```
nexora/
├── client/
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Route-level views
│       ├── layouts/          # Page layout wrappers
│       ├── hooks/            # Custom React hooks
│       ├── services/         # API call logic
│       └── routes/           # Route definitions
│
├── server/
│   └── src/
│       ├── config/           # DB and environment setup
│       ├── controllers/      # Request handlers
│       ├── middleware/        # Auth, validation, error handling
│       ├── models/           # Mongoose schemas
│       ├── routes/           # API route definitions
│       ├── services/         # Business logic
│       └── utils/            # Helpers and utilities
│
└── README.md
```

---

## User Roles

```
Super Admin
  └── Full platform access, user management, analytics

Faculty Coordinator
  └── Committee oversight, announcements, performance monitoring

Committee Head
  └── Member management, task assignment, event creation, attendance

Student Member
  └── Task view, event registration, announcements, participation tracking
```

---

## Roadmap

- [x] Authentication & Role Management
- [x] Committee & Member Management
- [x] Event Management
- [x] Task Tracking (Kanban)
- [ ] Attendance System
- [ ] Analytics Dashboard
- [ ] Certificate Generation
- [ ] QR Attendance
- [ ] AI Meeting Minutes
- [ ] Smart Event Planner
- [ ] Real-Time Notifications
- [ ] Mobile Application

---

## Security

- Passwords hashed with **bcrypt**
- Auth via **JWT** with protected routes
- **Role-Based Access Control** (RBAC) enforced server-side
- Secrets managed via **environment variables**

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## Author

**Aditi Rai**  

---

<div align="center">

If Nexora helped you, consider giving it a ⭐ — it means a lot.

Built with ❤️ using React, TypeScript, Express, and MongoDB

</div>
