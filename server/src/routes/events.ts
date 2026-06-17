import { Router } from "express";
import { eventController } from "../controllers/eventController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), eventController.createEvent);
router.get("/", authMiddleware, eventController.getEvents);
router.get("/upcoming", authMiddleware, eventController.getUpcomingEvents);
router.get("/:id", authMiddleware, eventController.getEventById);
router.put("/:id", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), eventController.updateEvent);
router.delete("/:id", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), eventController.deleteEvent);
router.post("/:id/register", authMiddleware, eventController.registerParticipant);

export default router;
