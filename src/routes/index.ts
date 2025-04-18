import { Router } from "express";
import authRoutes from "./auth.Routes";
import userRoutes from "./userRoutes";
import photoRoutes from "./photo.routes";
import adminRoutes from "./admin.routes";


import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.use("/auth", authRoutes);
router.use("/", userRoutes);
router.use("/", photoRoutes);
router.use("/", adminRoutes);

export default router;

