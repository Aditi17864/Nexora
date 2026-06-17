import { Router } from "express";
import { authController } from "../controllers/authController";
import { validateRegister } from "../middleware/validation";

const router = Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
