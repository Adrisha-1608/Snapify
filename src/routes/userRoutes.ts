import { Router } from "express";
import { getMe } from "../controllers/user.Controller";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/me", authenticate, getMe);

export default router;
