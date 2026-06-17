# Nexora - College Committee Management System

A complete full-stack application for managing college committees, events, tasks, and attendance with role-based access control.

## 🎯 Features

### User Roles
- **Super Admin**: Full system control, manage committees, users, analytics
- **Faculty Coordinator**: Oversee committee operations
- **Committee Head**: Create and manage events, post announcements
- **Student**: View events, register for participation, check attendance

### Core Features
- 🔐 JWT-based Authentication with bcrypt password hashing
- 👥 Committee Management with member tracking
- 📅 Event Management with participant registration
- ✅ Task Assignment and Status Tracking
- 📊 Attendance Tracking and Analytics
- 📢 Announcements System
- 🎨 Role-based Dashboards with custom UI themes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas cluster)
- npm or yarn

### Backend Setup

1. **Navigate to server folder**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
```

**Sample .env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexora
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

4. **Start the backend server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client folder**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register     - Register a new user
POST   /api/auth/login        - Login user
POST   /api/auth/logout       - Logout user
```

### User Endpoints
```
GET    /api/users/profile     - Get user profile
GET    /api/users             - Get all users (Super Admin, Faculty)
PUT    /api/users/:id         - Update user
DELETE /api/users/:id         - Delete user (Super Admin)
```

### Committee Endpoints
```
POST   /api/committees        - Create committee
GET    /api/committees        - Get all committees
GET    /api/committees/:id    - Get committee details
PUT    /api/committees/:id    - Update committee
DELETE /api/committees/:id    - Delete committee
POST   /api/committees/:id/members/add    - Add member
POST   /api/committees/:id/members/remove - Remove member
```

### Event Endpoints
```
POST   /api/events            - Create event
GET    /api/events            - Get all events
GET    /api/events/upcoming   - Get upcoming events
GET    /api/events/:id        - Get event details
PUT    /api/events/:id        - Update event
DELETE /api/events/:id        - Delete event
POST   /api/events/:id/register - Register for event
```

### Task Endpoints
```
POST   /api/tasks             - Create task
GET    /api/tasks             - Get all tasks
GET    /api/tasks/:id         - Get task details
PUT    /api/tasks/:id         - Update task
DELETE /api/tasks/:id         - Delete task
```

### Attendance Endpoints
```
POST   /api/attendance/mark   - Mark attendance
GET    /api/attendance        - Get attendance records
GET    /api/attendance/user/:userId - Get user attendance
```

### Announcement Endpoints
```
POST   /api/announcements     - Create announcement
GET    /api/announcements     - Get all announcements
DELETE /api/announcements/:id - Delete announcement
```

## 🔐 Demo Credentials

### Super Admin
```
Email: admin@nexora.edu
Password: admin123
```

### Committee Head
```
Email: head@nexora.edu
Password: head123
```

### Student
```
Email: student@nexora.edu
Password: student123
```

## 🎨 UI Theme Colors

- **Super Admin Dashboard**: Red (#DC2626)
- **Committee Head Dashboard**: Orange (#F97316)
- **Student Dashboard**: Blue (#2563EB)

## 📁 Project Structure

### Backend (`server/`)
```
src/
├── config/           - Database & environment config
├── controllers/      - Business logic
├── middleware/       - Auth, validation, error handling
├── models/          - MongoDB schemas
├── routes/          - API endpoints
├── services/        - Business services
├── types/           - TypeScript interfaces
├── utils/           - Utilities (JWT, response formatting)
└── server.ts        - Main server file
```

### Frontend (`client/`)
```
src/
├── components/
│   ├── dashboards/  - Role-based dashboards
│   ├── DashboardShell.tsx - Layout wrapper
│   └── Other components
├── services/
│   └── api.ts       - API client
├── App.tsx          - Main app component
└── main.tsx         - Entry point
```

## 🔄 Workflow

1. **Register/Login** → User authenticates
2. **Role-based Routing** → Redirects to appropriate dashboard
3. **Dashboard Navigation** → Access features based on role
4. **API Communication** → Frontend calls backend APIs
5. **Database Operations** → MongoDB stores/retrieves data

## 🛠️ Technologies Used

### Backend
- Express.js
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs
- CORS

### Frontend
- React
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- Axios

## 📝 Notes

- Default MongoDB connection uses local instance. Update `MONGODB_URI` for MongoDB Atlas
- JWT tokens stored in localStorage (frontend)
- API base URL: `http://localhost:5000/api`
- CORS enabled for localhost:5173

## 🚀 Production Deployment

1. Build frontend: `npm run build` in `client/`
2. Deploy to Vercel/Netlify
3. Update API URLs for production
4. Deploy backend to Heroku/Railway
5. Update environment variables on production server

## 📞 Support

For issues or questions, please refer to the backend/frontend configuration sections above.

---

Happy coding! 🎉
