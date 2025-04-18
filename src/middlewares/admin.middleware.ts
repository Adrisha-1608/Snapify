import { Request, Response, NextFunction } from "express";

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = (req as any).user;
  if (!user?.isAdmin) {
    res.status(403).json({ message: "Admins only" });
    return;
  }
  next();
};
