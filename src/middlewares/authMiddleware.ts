import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthPayload {
  userId: number;
  isAdmin: boolean;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return Promise.resolve();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
