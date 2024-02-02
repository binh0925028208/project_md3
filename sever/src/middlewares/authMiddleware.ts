import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.sendStatus(401);
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.sendStatus(401);
    }

    const token = tokenParts[1]; //token lấy từ header
    jwt.verify(token, "secret", (err: any, user: any) => {
      if (err) {
        return res.status(401).json("Token is not valid"); // Forbidden
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json("Request failed");
  } 
};
export default authMiddleware;
