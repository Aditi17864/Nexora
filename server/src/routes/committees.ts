import { Router } from "express";
import { committeeController } from "../controllers/committeeController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator"), committeeController.createCommittee);
router.get("/", authMiddleware, committeeController.getCommittees);
router.get("/:id", authMiddleware, committeeController.getCommitteeById);
router.put("/:id", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), committeeController.updateCommittee);
router.delete("/:id", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator"), committeeController.deleteCommittee);
router.post("/:id/members/add", authMiddleware, roleMiddleware("super_admin", "committee_head"), committeeController.addMember);
router.post("/:id/members/remove", authMiddleware, roleMiddleware("super_admin", "committee_head"), committeeController.removeMember);

export default router;
