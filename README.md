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
``'

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

Built with ❤️ love

</div>
