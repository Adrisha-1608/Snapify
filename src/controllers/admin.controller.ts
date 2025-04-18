import { Request, Response } from "express";
import Photo from "../models/photo.model";
import User from "../models/user.model";
import { logger } from "../utils/logger";
import { Op, Sequelize } from "sequelize";

export const getStats = async (_req: Request, res: Response) => {
  try {
    const totalUploads = await Photo.count();

    const mostActiveUploader = await Photo.findAll({
      attributes: [
        "userId",
        [Sequelize.fn("COUNT", Sequelize.col("userId")), "uploadCount"],
      ],
      group: ["userId"],
      order: [[Sequelize.literal("uploadCount"), "DESC"]],
      limit: 1,
    });

    const largestPhoto = await Photo.findOne({
      order: [["size", "DESC"]],
    });

    res.json({
      totalUploads,
      mostActiveUploader: mostActiveUploader[0],
      largestPhoto,
    });

    logger.info("Admin stats retrieved successfully");
  } catch (err) {
    logger.error("Fetching admin stats failed", { error: err });
    res.status(500).json({ message: "Server error", error: err });
  }
};







