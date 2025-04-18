import { Router } from "express";
import { uploadPhoto, getAllPhotos, getPhotoById, deletePhoto } from "../controllers/photo.controller";
import { authenticate } from "../middlewares/authMiddleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

router.post("/photos/upload", authenticate, upload.single("image"), uploadPhoto);
router.get("/photos", authenticate, getAllPhotos);
router.get("/photos/:id", authenticate, getPhotoById);
router.delete("/photos/:id", authenticate, deletePhoto);

export default router;
