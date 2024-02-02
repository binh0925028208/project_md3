import { NextFunction, Request, Response } from "express";

const checkRoleAdmin = (req: any, res: Response, next: NextFunction) => {
  console.log("đây là role", req.admin);
  if (req.admin.role == 2) {
    next();
  } else {
    res.status(403).json("Forbiden");
  }
};
export default checkRoleAdmin;
