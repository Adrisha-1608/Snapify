import { Request, Response } from "express";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinary.service";
import Photo from "../models/photo.model";
import { logger } from "../utils/logger";

export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;
  const caption = req.body.caption;
  const userId = (req as any).user.userId;

  if (!file) {
    logger.warn("No file uploaded");
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  try {
    const result = await uploadToCloudinary(file.buffer) as any;

    const photo = await Photo.create({
      caption,
      url: result.secure_url,
      publicId: result.public_id,
      size: file.size,
      userId,
    });

    logger.info(`Photo uploaded by user ${userId}`);
    res.status(201).json(photo);
  } catch (err) {
    logger.error("Upload failed", { error: err });
    res.status(500).json({ message: "Upload failed", error: err });
  }
};

export const getAllPhotos = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const photos = await Photo.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: photos.count,
      pages: Math.ceil(photos.count / limit),
      data: photos.rows,
    });
  } catch (err) {
    logger.error("Fetching photos failed", { error: err });
    res.status(500).json({ message: "Failed to fetch photos", error: err });
  }
};

export const getPhotoById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const userId = (req as any).user.userId;

  try {
    const photo = await Photo.findOne({ where: { id, userId } });
    if (!photo) {
      logger.warn(`Photo with ID ${id} not found for user ${userId}`);
      res.status(404).json({ message: "Photo not found" });
      return;
    }

    res.json(photo);
  } catch (err) {
    logger.error("Fetching photo by ID failed", { error: err });
    res.status(500).json({ message: "Failed to fetch photo", error: err });
  }
};

export const deletePhoto = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const userId = (req as any).user.userId;

  try {
    const photo = await Photo.findOne({ where: { id, userId } });
    if (!photo) {
      logger.warn(`Attempt to delete nonexistent photo ${id} by user ${userId}`);
      res.status(404).json({ message: "Photo not found" });
      return;
    }

    await deleteFromCloudinary(photo.publicId);
    await photo.destroy();

    logger.info(`Photo ${id} deleted by user ${userId}`);
    res.json({ message: "Photo deleted" });
  } catch (err) {
    logger.error("Photo deletion failed", { error: err });
    res.status(500).json({ message: "Failed to delete photo", error: err });
  }
};





