import { NextFunction, Request, Response } from "express";

const checkRoleUser = (req: any, res: Response, next: NextFunction) => {
  console.log("đây là role", req.user);
  if (req.user.role == 1) {
    next();
  } else {
    res.status(403).json("Forbiden");
  }
};
export default checkRoleUser;
