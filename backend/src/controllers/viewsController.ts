import type { Request, Response, NextFunction } from "express";

const home = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    title: "Loyalty Local!",
    data: "Hello World",
  });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    title: "Loyalty Local!",
    data: "Hello Login Page World",
  });
};
export default { home, login };
