import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import { seedDatabase } from "./config/seed";
import { config } from "./config/environment";
import { errorHandler } from "./middleware/errorHandler";

// Routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import committeeRoutes from "./routes/committees";
import eventRoutes from "./routes/events";
import taskRoutes from "./routes/tasks";
import attendanceRoutes from "./routes/attendance";
import announcementRoutes from "./routes/announcements";

dotenv.config();

const app = express();

// Connect Database
connectDB();
seedDatabase();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/committees", committeeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcements", announcementRoutes);

// Health Check
app.get("/api/health", (req, res) => {
res.json({
status: "Server Running",
database: "Connected",
timestamp: new Date(),
});
});

// Error Handler
app.use(errorHandler);

const PORT = config.port || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});
