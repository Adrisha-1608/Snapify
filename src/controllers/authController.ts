import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { logger } from "../utils/logger";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  logger.info(`Register attempt: ${email}`);

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn(`Registration failed: Email already exists - ${email}`);
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    logger.error(`Registration error for ${email}: ${(err as Error).message}`);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  logger.info(`Login attempt: ${email}`);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      logger.warn(`Login failed: User not found - ${email}`);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Invalid password - ${email}`);
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    logger.info(`User logged in successfully: ${email}`);
    res.json({ token });
  } catch (err) {
    logger.error(`Login error for ${email}: ${(err as Error).message}`);
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;
  logger.info(`Fetching profile for userId: ${userId}`);

  try {
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "isAdmin", "createdAt"],
    });

    if (!user) {
      logger.warn(`Profile not found for userId: ${userId}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    logger.info(`Profile fetched successfully for userId: ${userId}`);
    res.json(user);
  } catch (err) {
    logger.error(`Profile fetch error for userId ${userId}: ${(err as Error).message}`);
    res.status(500).json({ message: "Server error", error: err });
  }
};
