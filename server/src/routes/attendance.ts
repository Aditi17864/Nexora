import { Router } from "express";
import { attendanceController } from "../controllers/attendanceController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = Router();

router.post("/mark", authMiddleware, attendanceController.markAttendance);
router.get("/", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), attendanceController.getAttendance);
router.get("/user/:userId", authMiddleware, attendanceController.getUserAttendance);

export default router;
