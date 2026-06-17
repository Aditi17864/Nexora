import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware, roleMiddleware } from "../middleware/auth";

const router = Router();

router.get("/profile", authMiddleware, userController.getProfile);
router.get("/", authMiddleware, roleMiddleware("super_admin", "faculty_coordinator"), userController.getAllUsers);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, roleMiddleware("super_admin"), userController.deleteUser);

export default router;
