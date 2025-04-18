import { Request, Response } from "express";
import User from "../models/user.model";
import { logger } from "../utils/logger";

export const getMe = async (req: Request, res: Response) :Promise<void>=> {
  try {
    const userId = (req as any).user.userId;

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "isAdmin", "createdAt"],
    });

    if (!user) {
      logger.warn(`User not found with ID: ${userId}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    logger.info(`Fetched profile for userId: ${userId}`);
    res.status(200).json(user);
  } catch (error) {
    logger.error("Error fetching user profile", { error });
    res.status(500).json({ message: "Server error", error });
  }
};





