# 🎓 Red Dy Patil College Committee Manager - Admin Dashboard Setup Guide

## 🎨 About This Dashboard

This is a complete Red Dy Patil themed administration dashboard for managing college committees, events, tasks, and announcements. The dashboard features a professional red and white color scheme representing Red Dy Patil branding.

## 📋 Features

### Super Admin Dashboard
- ✅ **Dashboard Overview** - Real-time statistics and upcoming events
- ✅ **Committees Management** - Create, view, update, and delete committees
- ✅ **Events Management** - Manage college events with full details
- ✅ **Tasks Management** - Track tasks with progress indicators
- ✅ **Announcements** - Create and manage announcements
- ✅ **Members** - Manage college members (coming soon)
- ✅ **Analytics** - View analytics dashboard (coming soon)
- ✅ **Settings** - Configure system settings (coming soon)

### Design Features
- 🔴 Red Dy Patil branded theme (Red & White)
- 📱 Fully responsive design
- 🎯 Intuitive navigation
- ⚡ Real-time data updates
- 🔐 Role-based access control

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Step 1: Install Dependencies

#### Server Setup
```bash
cd server
npm install
```

#### Client Setup
```bash
cd client
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `server` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nexora

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_12345
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here_12345
JWT_REFRESH_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Step 3: Start MongoDB

#### Option 1: Local MongoDB
```bash
# Make sure MongoDB is running
mongod
```

#### Option 2: MongoDB Atlas (Cloud)
Update `MONGODB_URI` in `.env` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexora
```

### Step 4: Start the Backend Server

```bash
cd server
npm run dev
```

Expected output:
```
✅ MongoDB Connected
✅ Server running on port 5000
✅ API health check: http://localhost:5000/api/health
```

### Step 5: Start the Frontend

In a new terminal:

```bash
cd client
npm run dev
```

Expected output:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

### Step 6: Login to Dashboard

Visit `http://localhost:5173` and login with:
- **Role**: Super Admin
- **Sample credentials**: You can use any email/password (registration enabled)

## 📁 Project Structure

```
nexora/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── RedDyPatilAdminDashboard.tsx  # Main dashboard
│   │   │   ├── DashboardShell.tsx             # Layout wrapper
│   │   │   ├── Navbar.tsx
│   │   │   ├── LoginModal.tsx
│   │   │   └── dashboards/
│   │   │       ├── StudentDashboard.tsx
│   │   │       └── CommitteeHeadDashboard.tsx
│   │   ├── services/
│   │   │   └── api.ts                         # API endpoints
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── server/                    # Node.js Backend
    ├── src/
    │   ├── controllers/       # Request handlers
    │   │   ├── committeeController.ts
    │   │   ├── eventController.ts
    │   │   ├── taskController.ts
    │   │   ├── announcementController.ts
    │   │   ├── authController.ts
    │   │   ├── userController.ts
    │   │   └── attendanceController.ts
    │   ├── models/           # MongoDB schemas
    │   │   ├── Committee.ts
    │   │   ├── Event.ts
    │   │   ├── Task.ts
    │   │   ├── Announcement.ts
    │   │   ├── User.ts
    │   │   ├── Attendance.ts
    │   │   └── index.ts
    │   ├── routes/           # API routes
    │   │   ├── committees.ts
    │   │   ├── events.ts
    │   │   ├── tasks.ts
    │   │   ├── announcements.ts
    │   │   ├── auth.ts
    │   │   ├── users.ts
    │   │   └── attendance.ts
    │   ├── middleware/       # Express middleware
    │   │   ├── auth.ts       # Authentication & authorization
    │   │   ├── errorHandler.ts
    │   │   └── validation.ts
    │   ├── config/           # Configuration files
    │   │   ├── database.ts
    │   │   └── environment.ts
    │   ├── services/         # Business logic
    │   │   ├── authService.ts
    │   │   └── analyticsService.ts
    │   ├── types/            # TypeScript types
    │   │   └── index.ts
    │   ├── utils/            # Utility functions
    │   │   ├── jwt.ts
    │   │   └── response.ts
    │   └── server.ts         # Express app setup
    ├── package.json
    └── tsconfig.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Committees
- `GET /api/committees` - List all committees
- `POST /api/committees` - Create committee (Super Admin only)
- `GET /api/committees/:id` - Get committee details
- `PUT /api/committees/:id` - Update committee
- `DELETE /api/committees/:id` - Delete committee
- `POST /api/committees/:id/members/add` - Add member
- `POST /api/committees/:id/members/remove` - Remove member

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/:id` - Get event details
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/register` - Register for event

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Announcements
- `GET /api/announcements` - List announcements
- `POST /api/announcements` - Create announcement
- `DELETE /api/announcements/:id` - Delete announcement

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

## 🎨 Color Scheme

Red Dy Patil Theme:
- **Primary Red**: `#DC2626` (Red-600)
- **Dark Red**: `#7F1D1D` (Red-900)
- **Light Red**: `#FEE2E2` (Red-100)
- **White**: `#FFFFFF`
- **Gray**: Various shades for text and backgrounds

## 🔐 Authentication & Authorization

### Roles
- **Super Admin** - Full access to all features
- **Committee Head** - Can manage their committee
- **Faculty Coordinator** - Can coordinate events
- **Student** - Limited access to events and announcements

### JWT Token
- Tokens are stored in `localStorage`
- Automatically sent in Authorization header: `Bearer {token}`
- Tokens expire after 7 days

## 🧪 Testing the Dashboard

### Test User Creation

1. Visit `http://localhost:5173`
2. Click "Login" or "Get Started"
3. Click "Sign Up"
4. Fill in credentials:
   - Name: `Admin User`
   - Email: `admin@test.com`
   - Password: `Test@123456`
   - Role: `Super Admin`
5. Click Register

### Create Test Data

Once logged in:

1. **Add Committee**
   - Click "Committees" from sidebar
   - Click "Add Committee"
   - Fill details and submit

2. **Create Event**
   - Click "Events" from sidebar
   - Click "Add Event"
   - Fill event details

3. **Create Task**
   - Click "Tasks" from sidebar
   - Click "Add Task"
   - Set task details and deadline

4. **Post Announcement**
   - Click "Announcements" from sidebar
   - Click "New Announcement"
   - Write announcement

## 🐛 Troubleshooting

### "MongoDB Connection Failed"
- Make sure MongoDB is running (`mongod` in terminal)
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB is listening on port 27017

### "CORS Error"
- Check `CORS_ORIGIN` in `.env` matches frontend URL
- Default is `http://localhost:5173`

### "Token Expired"
- Clear localStorage: `localStorage.clear()`
- Login again

### "Port Already in Use"
- Change `PORT` in `.env` (default: 5000)
- Change frontend port in `vite.config.ts`

## 📦 Build for Production

### Client Build
```bash
cd client
npm run build
npm run preview
```

### Server Build
```bash
cd server
npm run build
npm start
```

## 📚 Technologies Used

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vite
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- TypeScript
- Nodemon (development)

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment |
| `MONGODB_URI` | mongodb://localhost:27017/nexora | MongoDB connection |
| `JWT_SECRET` | your_secret_key | JWT secret key |
| `JWT_EXPIRE` | 7d | JWT expiration time |
| `CORS_ORIGIN` | http://localhost:5173 | Frontend URL |

## 🤝 Contributing

To add new features:

1. Create feature branch: `git checkout -b feature/new-feature`
2. Update relevant controllers and routes
3. Update frontend components
4. Test thoroughly
5. Submit pull request

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check console logs for errors
4. Verify environment configuration

## 📄 License

Red Dy Patil College - All Rights Reserved

---

**Created for Red Dy Patil College Committee Management System**
