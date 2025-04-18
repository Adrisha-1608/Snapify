import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { isAdmin } from "../middlewares/admin.middleware";
import { getStats } from "../controllers/admin.controller";

const router = Router();

router.get("/admin/stats", authenticate, isAdmin, getStats);

export default router;
