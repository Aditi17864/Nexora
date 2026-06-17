import { Router } from "express";
import { announcementController } from "../controllers/announcementController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), announcementController.createAnnouncement);
router.get("/", authMiddleware, announcementController.getAnnouncements);
router.delete("/:id", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator"), announcementController.deleteAnnouncement);

export default router;
