import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator", "committee_head"), taskController.createTask);
router.get("/", authMiddleware, taskController.getTasks);
router.get("/:id", authMiddleware, taskController.getTaskById);
router.put("/:id", authMiddleware, taskController.updateTask);
router.delete("/:id", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator"), taskController.deleteTask);

export default router;
